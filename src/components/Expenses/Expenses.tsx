import React from 'react';
import styles from './Expenses.module.scss'
import {Carousel} from '@trendyol-js/react-carousel';
import ButtonMonth from "../ButtonMonth/ButtonMonth";
import Arrow from "../Arrow/Arrow";
import WheelChart from '../WheelChart/WheelChart';
import {useAppSelector} from "../../hooks/redux-hooks";

interface ISpendProps {
  [key: string]: {
    category: string;
    date: string;
    operationName: string;
    sum: number;
  };
}


const Expenses = () => {
    const spend = useAppSelector(state => state.spend);

const formatSpend = (spend: ISpendProps) => {
  const summarizedCategories  = Object.values(spend).reduce((categories, obj) => {
    // @ts-ignore
      categories[obj.category] = (categories[obj.category] || 0) + obj.sum;
    return categories;
  }, {});

  const categories = ['Спорт', 'Связь', 'Продукты', 'Кафе', 'Одежда', 'Транспорт'];

  // @ts-ignore
    return categories.map(category  => summarizedCategories[category] || 0);
};

 const isEmpty = formatSpend(spend).every(value => value === 0)

    const data = {
        labels: isEmpty? ['Нет трат'] : ['Спорт', 'Связь', 'Продукты', 'Кафе', 'Одежда', 'Транспорт'],
        datasets: [
            {
              label: isEmpty ? 'Пока трат нет' : 'Траты',
                data:isEmpty? [1] : formatSpend(spend),
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
            <WheelChart data={data}/>
            <Carousel className={styles.expenses__slider} leftArrow={<Arrow isArrowLeft={true}/>}
                      rightArrow={<Arrow isArrowLeft={false}/>} show={3}
                      slide={2} swiping={true}>
                <ButtonMonth text={'Январь'}></ButtonMonth>
                <ButtonMonth text={'Февраль'}></ButtonMonth>
                <ButtonMonth text={'Март'}></ButtonMonth>
                <ButtonMonth text={'Аперль'}></ButtonMonth>
                <ButtonMonth text={'Май'}></ButtonMonth>
                <ButtonMonth text={'Июнь'}></ButtonMonth>
                <ButtonMonth text={'Июль'}></ButtonMonth>
                <ButtonMonth text={'Август'}></ButtonMonth>
                <ButtonMonth text={'Сентябрь'}></ButtonMonth>
                <ButtonMonth text={'Октябрь'}></ButtonMonth>
                <ButtonMonth text={'Ноябрь'}></ButtonMonth>
                <ButtonMonth text={'Декабрь'}></ButtonMonth>
            </Carousel>
        </section>
    );
};

export default Expenses;
