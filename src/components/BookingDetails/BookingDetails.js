import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export const BookingDetails = (data) => {
  const { checkIn, checkOut, monthInfo } = data?.data || {};
  // props object that will be passed to payment page when confirming booking
  const props = {
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    bookingDates: []
  }

  const navigate = useNavigate();
  const navigatePayment = () => {
    navigate('/payment', {state: {props}});
  }

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

      let checkInDate = new Date(checkIn);
      let checkOutDate = new Date(checkOut);
      // switch dates is user has selected checkOut date first
      if (checkIn > checkOut) {
        checkInDate = new Date(checkOut);
        checkOutDate = new Date(checkIn);
      }
      // need to convert ids to readable dates for user confirmation...
      const checkInDateString = checkInDate.toDateString();;
      const checkOutDateString = checkOutDate.toDateString();      

      const bookedDates = [];
      // need to figure out which nights user is staying...
      // if checkin and checkout are within same calendar month
      if (checkInDate.getMonth() === checkOutDate.getMonth()) {

        const checkInDateInt = checkInDate.getDate();
        const checkOutDateInt = checkOutDate.getDate();
        
        for (let i = checkInDateInt; i < checkOutDateInt; i++) {
          // includes night of check in, but not night of the day of check out
          bookedDates.push(new Date(checkInDate.getFullYear(), checkInDate.getMonth(), i));
        }
        //update state that will be sent to payment page
        props.bookingDates = bookedDates;
      }
      // if checkin and checkout are different calendar months...
      if (checkInDate.getMonth() !== checkOutDate.getMonth()) {
        const checkInDateInt = checkInDate.getDate();

        const checkInMonthDays = monthInfo[checkInDate.getMonth()].days;
        // push all dates from checkin month (eg 27th to 31st)
        for (let i = checkInDateInt; i <= checkInMonthDays; i++) {
          bookedDates.push(new Date(checkInDate.getFullYear(), checkInDate.getMonth(), i));
        }
        // push all dates from checkout month (eg 1st to 3rd)
        for (let x = 1; x < checkOutDate.getDate(); x++) {
          bookedDates.push(new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), x));
        }
        //update state that will be sent to payment page
        props.bookingDates = bookedDates;
      }
      
      return (
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationDate}>
            <h5>Check in date: {checkInDateString || ''}</h5>
          </div>
          <div className={styles.confirmationDate}>
            <h5>Check out date: {checkOutDateString || ''}</h5>
          </div>
          <div>
            <button onClick={navigatePayment}>Continue to payment</button>
          </div>
        </div>
      )
    }

}