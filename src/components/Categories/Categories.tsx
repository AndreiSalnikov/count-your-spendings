import React from 'react';
import styles from './Categories.module.scss'
interface ICategories {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const Categories: React.FC<ICategories> = ({ category, setCategory }) => {

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const value = event.currentTarget.dataset.value;
    if (value) {
      setCategory(value);
    }
  };

  const buttonValues: string[] = ['Спорт', 'Связь', 'Продукты', 'Одежда', 'Кафе', 'Транспорт'];

  return (
    <div className={styles.categories}>
      {buttonValues.map((value, index) => (
        <div
          className={category === value ? `${styles.categories__category} ${styles.categories__active}` : `${styles.categories__category}`}
          key={index}
          data-value={value}
          onClick={handleButtonClick}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default Categories;
