import { useState } from 'react';
import { findDateValues } from '../../utils/findDateValues';
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
  //User selection states
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  //Loading state while waiting for server to fetch data
  const [isLoading, setIsLoading] = useState(false);
  
  // const weekDays = { 0: { name: 'Sunday' }, 1: { name: 'Monday' }, 2: { name: 'Tuesday' }, 3: { name: 'Wednesday' }, 4: { name: 'Thursday' }, 5: { name: 'Friday' }, 6: { name: 'Saturday' } };
  const monthInfo = { 0: { name: 'January', days: 31}, 1: { name: 'February', days: 28}, 2: { name: 'March', days: 31}, 3: { name: 'April', days: 30}, 4: { name: 'May', days: 31}, 5: { name: 'June', days: 30}, 6: { name: 'July', days: 31}, 7: { name: 'August', days: 31}, 8: { name: 'September', days: 30}, 9: { name: 'October', days: 31}, 10: { name: 'November', days: 30}, 11: { name: 'December', days: 31}};

  // const renderMonth = monthInfo[currentMonth]?.name;
  const renderDays = monthInfo[currentMonth]?.days;
  const monthData = [];
  //Object to send to backend for processing requests
  const bookingInfo = {
    checkIn: checkIn,
    checkOut: checkOut,
    monthInfo: monthInfo,
    roomCapacity: numberOfGuests,
    bookedDates: [],
  };

  const onSubmit = () => {
    //need to send request to backend to check what rooms are available
    //then need to update availableRooms state to show Roompicker element once data received
    //isLoading state used while waiting for this, to show that query is being processed / disable input in the meantime
    console.log(bookingInfo);
  }

  const changeMonth = (value) => {
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

  const BookingDetails = () => {
    if (!checkIn) return (<h3>Please select a check in date.</h3>);
            
    if (!checkOut) return (<h3>Please select a check out date.</h3>);
    
    if (checkIn && checkOut) {
      const result = findDateValues(checkIn, checkOut, monthInfo);
      bookingInfo.bookedDates = result.bookedDates;
      return (
        <div className={styles.confirmationContainer}>
        <div className={styles.confirmationDate}>
          <h5>Check in date: {result.checkIn || ''}</h5>
        </div>
        <div className={styles.confirmationDate}>
          <h5>Check out date: {result.checkOut || ''}</h5>
        </div>
        <div>
          <button onClick={onSubmit}>Check availability</button>
        </div>
      </div>
      )
    }
  }
  
  return (
      <div className={styles.main}>
          <div>
            Number of guests:
            <select value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={5}>2-5</option>
            </select>
          </div>
      
          <div className={styles.calendarHeader}>
            <button value='prev' onClick={(e) => changeMonth(e.target.value)} >
              {'<< Prev'}
            </button>
            <h3>{monthInfo[currentMonth]?.name.substring(0, 3)} {currentYear}</h3>
            <button value='next' onClick={(e) => changeMonth(e.target.value)}>
              {'Next >>'}
            </button>
          </div>

          <div className={styles.datepickerMonth}>
            {Object.values(monthData).map((day) => (
              <DatepickerSingleDay key={day.id} dateObject={day} checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut} />
            ))}
          </div>
            
          <div>
            {BookingDetails()}
          </div>
       </div>

  
)

}