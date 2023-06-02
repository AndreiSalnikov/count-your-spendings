import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styles from './PopupSubtraction.module.scss';
import Popup from '../Popup/Popup';
import {format} from 'date-fns';
import Categories from "../Categories/Categories";

registerLocale('ru', ru);

interface IPopupSubtractionProps {
    isPopupOpen: boolean,
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const PopupSubtraction: React.FC<IPopupSubtractionProps> = ({isPopupOpen, setIsPopupOpen}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>('');
    const [spend, setSpend] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

    const resetForm = () => {
        setSelectedDate(null);
        setName('');
        setSpend(0);
        setCategory('');
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
        console.log(name, spend, formattedDate, category)
        setIsPopupOpen(false)
        setTimeout(() => {
            resetForm();
        }, 500);
    }

    return (
        <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}>
            <form onSubmit={onSubmit} className={styles.subtraction}>
                <h2 className={styles.subtraction__title}>Добавьте расходы</h2>
                <input className={styles.subtraction__input} placeholder="Название операции"
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
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
