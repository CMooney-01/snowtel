import { Datepicker } from '../Datepicker';
import styles from './styles.module.css';

export const Accommodation = () => {
  var calendarHeaderText = new Date().toLocaleDateString('en-us', {year: 'numeric', month: 'short'});

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
            <div className={styles.datepickerMonth}>
              <Datepicker />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}