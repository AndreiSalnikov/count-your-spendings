import React from 'react';
import styles from './Expenses.module.scss'
import {Carousel} from '@trendyol-js/react-carousel';
import ButtonMonth from "../ButtonMonth/ButtonMonth";
import Arrow, {ArrowDirection} from "../Arrow/Arrow";
import WheelChart from '../WheelChart/WheelChart';
import {useAppSelector} from "../../hooks/redux-hooks";

enum Category {
    Sport = 'Спорт',
    Communication = 'Связь',
    Products = 'Продукты',
    Clothing = 'Одежда',
    Cafe = 'Кафе',
    Transport = 'Транспорт'
}

enum Months {
    January = 'Январь',
    February = 'Февраль',
    March = 'Март',
    April = 'Апрель',
    May = 'Май',
    June = 'Июнь',
    July = 'Июль',
    August = 'Август',
    September = 'Сентябрь',
    October = 'Октябрь',
    November = 'Ноябрь',
    December = 'Декабрь'

}

interface ISpend {
    category: Category;
    date: string;
    operationName: string;
    sum: number;
}

const Expenses = () => {
    const spend = useAppSelector(state => state.spend);

    const formatSpend = (spend: Record<Category, ISpend>) => {
        const summarizedCategories = Object.values(spend).reduce((categories, obj) => {
            categories[obj.category] = (categories[obj.category] || 0) + obj.sum;
            return categories;
        }, {} as Record<Category, number>);

        const categories = Object.values(Category);

        return categories.map(category => summarizedCategories[category] || 0);
    };

    const isEmpty = formatSpend(spend as Record<Category, ISpend>).every(value => value === 0);

    const data = {
        labels: isEmpty ? ['Нет трат'] : Object.values(Category),
        datasets: [
            {
                label: isEmpty ? 'Пока трат нет' : 'Траты',
                data: isEmpty ? [1] : formatSpend(spend as Record<Category, ISpend>),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section className={styles.expenses}>
            <Carousel className={styles.slider} leftArrow={<Arrow direction={ArrowDirection.Left}/>}
                      rightArrow={<Arrow direction={ArrowDirection.Right}/>} show={3}
                      slide={2} swiping={true}>
                {Object.values(Months).map(month => (
                    <ButtonMonth key={month} text={month}/>
                ))}
            </Carousel>
            <WheelChart data={data}/>

        </section>
    );
};

export default Expenses;
