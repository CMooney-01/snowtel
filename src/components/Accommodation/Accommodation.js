import { useState } from 'react';
import styles from './styles.module.css';

const todaysDate = new Date();
const currentMonth = todaysDate.getMonth();
const currentYear = todaysDate.getFullYear();

export const Accommodation = () => {
  const [headerMonth, setHeaderMonth] = useState(currentMonth);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  console.log(currentMonth);
  // const calendarHeaderText = new Date().toLocaleDateString('en-us', {year: 'numeric', month: 'short'});

  const handleClick = value => {
    if (!value) {
      return;
    }
    
    value === 'prev' ? setHeaderMonth((headerMonth) => headerMonth - 1) : setHeaderMonth((headerMonth) => headerMonth + 1);
  }


  return (
    <div>
      <div className={styles.datePicker}>
        <p>Check available dates</p>
        {/* <label for="startDate">Check in date: </label>
        <input type="date" id="startDate"></input>

        <label for="endDate">Check out date: </label>
        <input type="date" id="endDate"></input> */}

        <div>
          <div className={styles.calendarHeader}>
            <button onClick={() => handleClick('prev')}>
              {'<'}
            </button>
            <h3>{monthNames[headerMonth]} {currentYear}</h3>
            <button onClick={() => handleClick('next')}>
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}