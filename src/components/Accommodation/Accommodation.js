import { useState } from 'react';
import styles from './styles.module.css';

const todaysDate = new Date();
const currentMonth = todaysDate.getMonth();
const currentYear = todaysDate.getFullYear();


export const Accommodation = () => {
  const [headerMonth, setHeaderMonth] = useState(currentMonth);
  // const [headerYear, setHeaderYear] = useState(currentYear)
  
  const weekDays = { 0: { name: 'Sunday' }, 1: { name: 'Monday' }, 2: { name: 'Tuesday' }, 3: { name: 'Wednesday' }, 4: { name: 'Thursday' }, 5: { name: 'Friday' }, 6: { name: 'Saturday' } };
  const monthInfo = { 0: { name: 'January', days: 31}, 1: { name: 'February', days: 28}, 2: { name: 'March', days: 31}, 3: { name: 'April', days: 30}, 4: { name: 'May', days: 31}, 5: { name: 'June', days: 30}, 6: { name: 'July', days: 31}, 7: { name: 'August', days: 31}, 8: { name: 'September', days: 30}, 9: { name: 'October', days: 31}, 10: { name: 'November', days: 30}, 11: { name: 'December', days: 31}};

  var calendarHeaderText = new Date().toLocaleDateString('en-us', {year: 'numeric', month: 'short'});


  const calendarMonth = () => {

    const renderMonth = monthInfo[currentMonth]?.name;
    const renderDays = renderMonth?.days;
    let dayCount = 0;

    const firstDay = new Date(`${renderMonth} 1, ${currentYear}`).getDay();
    console.log(firstDay);
    const populateWeek = () => {
      return (
        Object.values(weekDays).map((day) => (
          <div className={styles.calendarDay}>
            <p>{day?.name}</p>
          </div>
        ))
      )
    }

    return (
      <div className={styles.calendarMonth}>
        <div className={styles.calendarWeek}>  
          {/* for (let i = 0; i < ) */}
          {populateWeek()}
        </div>
        <div className={styles.calendarWeek}>  
          {populateWeek()}
        </div>
        <div className={styles.calendarWeek}>  
          {populateWeek()}
        </div>
        <div className={styles.calendarWeek}>  
          {populateWeek()}
        </div>
        <div className={styles.calendarWeek}>  
          {populateWeek()}
        </div>
      </div>
      
    )
  }


  return (
    <div>
      <div className={styles.datePicker}>
        <p>Check available dates</p>
        {/* <label for="startDate">Check in date: </label>
        <input type="date" id="startDate"></input>

        <label for="endDate">Check out date: </label>
        <input type="date" id="endDate"></input> */}

        {/* Calendar component DIV */}
        <div>
          {/* Calendar header DIV */}
          <div className={styles.calendarHeader}>
            <button onClick={() => ('prev')}>
              {'<'}
            </button>
            <h3>{calendarHeaderText}</h3>
            <button onClick={() => ('next')}>
              {'>'}
            </button>
          </div>
          {/* Date picker DIV */}
          <div>
            <div className={styles.datepickerWeek}>
              {calendarMonth()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}