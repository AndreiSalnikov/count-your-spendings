import React, {useState, useCallback} from 'react';
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
import {IPopupProps} from '../../utils/types'


registerLocale('ru', ru);

const PopupSubtraction: React.FC<IPopupProps<boolean>> = ({isPopupOpen, setIsPopupOpen}) => {
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(state => state.user);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const [title, setTitle] = useState('');
    const [spend, setSpend] = useState(0);
    const [category, setCategory] = useState('');

    const resetForm = () => {
        setSelectedDate(new Date());
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
        //вынести отдельно, или подумать как упроситить
        const currentDate = new Date();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const currentMonthName = monthNames[currentDate.getMonth()];
        const currentYear = currentDate.getFullYear();
        if (id) {
            await updateAdd({userId: id, data});
            const sp = await getSpend(id, currentYear, currentMonthName);
            Object.entries(sp).forEach(([spendId, spendData]) => {
                dispatch(addSpend({spendId, spendData}));
            })
        }

        setIsPopupOpen(false);
        setTimeout(() => {
            resetForm();
        }, 500);
    };

    const handleChange = useCallback((date: Date | null) => {
        setSelectedDate(date);
    }, []);

    return (
        <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}>
            <form onSubmit={onSubmit} className={styles.subtraction}>
                <h2 className={styles.title}>Добавьте расходы</h2>
                <input className={styles.input} placeholder="Название операции"
                       required
                       type="text"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                <input className={styles.input} placeholder="Сумма"
                       required
                       type="number"
                    //   value={spend}
                       onChange={(e) => setSpend(Number(e.target.value))}
                />
                <DatePicker
                    className={`${styles.subtraction__test} custom-class`}
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                    locale="ru"
                />
                <Categories category={category} setCategory={setCategory}/>
                <button className={styles.button}>Добавить</button>
            </form>
        </Popup>

    );
};


export default PopupSubtraction;
