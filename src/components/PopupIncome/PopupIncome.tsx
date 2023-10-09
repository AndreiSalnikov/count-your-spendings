import React, {useState, useCallback} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styles from './PopupIncome.module.scss';
import Popup from '../Popup/Popup';
import {format} from 'date-fns';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {addIncome, getIncome} from "../../utils/firebase";
import {addIncomeStore,} from "../../store/slices/incomeSlice";
import {IPopupProps} from '../../utils/types'


registerLocale('ru', ru);

const PopupIncome: React.FC<IPopupProps<boolean>> = ({isPopupOpen, setIsPopupOpen}) => {
    const dispatch = useAppDispatch();
    const {id} = useAppSelector(state => state.user);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [title, setTitle] = useState('');
    const [income, setIncome] = useState(0);

    const resetForm = () => {
        setSelectedDate(new Date());
        setTitle('');
        setIncome(0);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
        const data = {
            sum: income,
            operationName: title,
            date: formattedDate,
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
            await addIncome({userId: id, data});
            const income = await getIncome(id, currentYear, currentMonthName);
            Object.entries(income).forEach(([incomeId, incomeData]) => {
                dispatch(addIncomeStore({incomeId, incomeData}));
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
            <form onSubmit={onSubmit} className={styles.income}>
                <h2 className={styles.title}>Добавьте доход</h2>
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
                       onChange={(e) => setIncome(Number(e.target.value))}
                />
                <DatePicker
                    className={`${styles.subtraction__test} custom-class`}
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                    locale="ru"
                />
                <button className={styles.button}>Добавить</button>
            </form>
        </Popup>

    );
};


export default PopupIncome;
