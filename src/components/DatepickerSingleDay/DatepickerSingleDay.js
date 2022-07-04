import styles from './styles.module.css';

const weekDays = { 0: { name: 'Sunday' }, 1: { name: 'Monday' }, 2: { name: 'Tuesday' }, 3: { name: 'Wednesday' }, 4: { name: 'Thursday' }, 5: { name: 'Friday' }, 6: { name: 'Saturday' } };

export const DatepickerSingleDay = (dateObject) => {
  const { id, dayOfMonth, dayOfWeek } = dateObject?.dateObject || '';
  const { checkIn, setCheckIn, checkOut, setCheckOut } = dateObject || '';
  
  const handleClick = () => {
      //if no check in date, set check in date
      if (!checkIn && !checkOut) {
        setCheckIn(id);
        return;
      }
      //if check in date but no check out date, set check out date
      if (checkIn && !checkOut) {
        setCheckOut(id);
        return;
      }
      //if both check in and check out date, set new check in date and clear check out date
      if (checkIn && checkOut) {
        setCheckIn(id);
        setCheckOut();
        return;
      }
    
  }

  return (
    <button id={id} onClick={handleClick} className={(checkIn === id || checkOut === id) ? `${styles.calendarDay} ${styles.selected}` : styles.calendarDay}>
      {weekDays[dayOfWeek]?.name.substring(0, 3)}
      <br />
      {dayOfMonth}
    </button>
  )

}