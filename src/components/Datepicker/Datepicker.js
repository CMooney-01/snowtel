import { useState } from 'react';
import { DatepickerSingleDay } from '../DatepickerSingleDay/DatepickerSingleDay';
import styles from './styles.module.css';

const todaysDate = new Date();
const todaysMonth = todaysDate.getMonth();
const todaysYear = todaysDate.getFullYear();

export const Datepicker = () => {
  //month state as an integer, 0 = jan, 1 = feb etc
  const [currentMonth, setCurrentMonth] = useState(todaysMonth);
  //year state as an integer, 2022 = 2022
  const [currentYear, setCurrentYear] = useState(todaysYear);
  
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  
  // const weekDays = { 0: { name: 'Sunday' }, 1: { name: 'Monday' }, 2: { name: 'Tuesday' }, 3: { name: 'Wednesday' }, 4: { name: 'Thursday' }, 5: { name: 'Friday' }, 6: { name: 'Saturday' } };
  const monthInfo = { 0: { name: 'January', days: 31}, 1: { name: 'February', days: 28}, 2: { name: 'March', days: 31}, 3: { name: 'April', days: 30}, 4: { name: 'May', days: 31}, 5: { name: 'June', days: 30}, 6: { name: 'July', days: 31}, 7: { name: 'August', days: 31}, 8: { name: 'September', days: 30}, 9: { name: 'October', days: 31}, 10: { name: 'November', days: 30}, 11: { name: 'December', days: 31}};

  // const renderMonth = monthInfo[currentMonth]?.name;
  const renderDays = monthInfo[currentMonth]?.days;
  const monthData = [];

  const handleClick = (value) => {
    console.log('here', value);
    if (!value) {
      return;
    }

    if (value === 'prev') {
      // if going back to prev year
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
        return;
      }
      // otherwise
      setCurrentMonth(currentMonth - 1);
      return;
    }

    if (value === 'next') {
      // if going forward to next year
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
        return;
      }
      // otherwise
      setCurrentMonth(currentMonth + 1);
      return;
    }

    console.log('handleclick', currentMonth);
  }

  const populateMonth = () => {
    
    for (let i = 0; i < renderDays; i++) {
      const date = new Date(currentYear, currentMonth, i + 1);
      const weekDay = date.getDay();
      const dayOfMonth = date.getDate();
      const dateId = date.valueOf();

      const obj = {
        date: date,
        dayOfWeek: weekDay,
        dayOfMonth: dayOfMonth,
        available: true,
        id: dateId
      };
      
      monthData.push(obj);
    }
    
  }

  populateMonth();

  const confirmStay = () => {
    if (!checkIn) {
      return (
        <h3>Please select a check in date.</h3>
      )
    }
    if (!checkOut) {
      return (
        <h3>Please select a check out date.</h3>
      )
    }
    if (checkIn && checkOut) {
      // need to convert ids to readable dates for user confirmation...
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const checkInDateString = checkInDate.toDateString();
      const checkOutDateString = checkOutDate.toDateString();
      // need to figure out how many nights user is staying...
      let lengthOfStay;
      if (checkInDate.getMonth() === checkOutDate.getMonth()) {
        lengthOfStay = checkOutDate.getDate() - checkInDate.getDate()
      }

      
      return (
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationDate}>
            <h5>Check in date: {checkInDateString}</h5>
          </div>
          <div className={styles.confirmationDate}>
            <h5>Check out date: {checkOutDateString}</h5>
          </div>
          <div>
            <p>You will be staying for {lengthOfStay} nights</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className={styles.main}>
      <p>Check available dates</p>
      <div className={styles.calendarHeader}>
        
        
        <button value='prev' onClick={(e) => handleClick(e.target.value)} >
         {'<< Prev'}
        </button>
        <h3>{ monthInfo[currentMonth]?.name.substring(0, 3) } { currentYear }</h3>
        <button value='next' onClick={(e) => handleClick(e.target.value)}>
          {'Next >>'}
        </button>
      </div>

      <div className={styles.datepickerMonth}>
        {Object.values(monthData).map((day) => (
          <DatepickerSingleDay dateObject={day} checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut} />
          ))}
      </div>  
      
      <div>
        {confirmStay()}
      </div>
    </div>

)

}