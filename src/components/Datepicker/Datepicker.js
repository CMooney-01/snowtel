import styles from './styles.module.css';

const todaysDate = new Date();
const currentMonth = todaysDate.getMonth();
const currentYear = todaysDate.getFullYear();

export const Datepicker = () => {

  const weekDays = { 0: { name: 'Sunday' }, 1: { name: 'Monday' }, 2: { name: 'Tuesday' }, 3: { name: 'Wednesday' }, 4: { name: 'Thursday' }, 5: { name: 'Friday' }, 6: { name: 'Saturday' } };
  const monthInfo = { 0: { name: 'January', days: 31}, 1: { name: 'February', days: 28}, 2: { name: 'March', days: 31}, 3: { name: 'April', days: 30}, 4: { name: 'May', days: 31}, 5: { name: 'June', days: 30}, 6: { name: 'July', days: 31}, 7: { name: 'August', days: 31}, 8: { name: 'September', days: 30}, 9: { name: 'October', days: 31}, 10: { name: 'November', days: 30}, 11: { name: 'December', days: 31}};

  const renderMonth = monthInfo[currentMonth]?.name;
  const renderDays = monthInfo[currentMonth]?.days;
  const monthData = [];

  const firstDay = new Date(`${renderMonth} 1, ${currentYear}`).getDay();

  const populateMonth = () => {
    
    for (let i = 0; i < renderDays; i++) {
      const date = new Date(currentYear, currentMonth, i+1);
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

  return (
    Object.values(monthData).map((day) => (
      <div id={day.id} className={styles.calendarDay}>
        <p>{weekDays[day.dayOfWeek].name}</p>
        <p>{day.dayOfMonth}</p>
      </div>
    ))
  )
}