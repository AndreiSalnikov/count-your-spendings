import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styles from './PopupSubtraction.module.scss';
import Popup from '../Popup/Popup';
import {format} from 'date-fns';
import Categories from "../Categories/Categories";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getSpend, updateAdd} from "../../utils/firebase";
import {addSpend} from "../../store/slices/spendSlice";

registerLocale('ru', ru);

interface IPopupSubtractionProps {
    isPopupOpen: boolean,
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const PopupSubtraction: React.FC<IPopupSubtractionProps> = ({isPopupOpen, setIsPopupOpen}) => {
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(state => state.user);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [title, setTitle] = useState<string>('');
    const [spend, setSpend] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

    const resetForm = () => {
        setSelectedDate(null);
        setTitle('');
        setSpend(0);
        setCategory('');
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const random = Math.floor(Math.random() * 100) + 1;
        const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
        const data = {
            sum: spend,
            operationName: title,
            date: formattedDate,
            category: category,
            id: random,
        };

        if (id) {
            await updateAdd({userId: id, data});
            const sp = await getSpend(id);
            Object.entries(sp as Record<string, unknown>).forEach(([spendId, spendData]) => {
                dispatch(addSpend({spendId, spendData}));
            });
        }

        setIsPopupOpen(false);
        setTimeout(() => {
            resetForm();
        }, 500);
    };


    return (
        <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}>
            <form onSubmit={onSubmit} className={styles.subtraction}>
                <h2 className={styles.subtraction__title}>Добавьте расходы</h2>
                <input className={styles.subtraction__input} placeholder="Название операции"
                       type="text"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                <input className={styles.subtraction__input} placeholder="Сумма"
                       type="text"
                       value={spend}
                       onChange={(e) => setSpend(Number(e.target.value))}
                />
                <DatePicker
                    className={`${styles.subtraction__test} custom-class`}
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                    locale="ru"
                />
                <Categories category={category} setCategory={setCategory}/>
                <button className={styles.subtraction__button}>Добавить</button>
            </form>
        </Popup>

    );
};


export default PopupSubtraction;
