import mail from '../../assets/icons/mail.png';
import telephone from '../../assets/icons/telephone.png';
import styles from './styles.module.css';

//exporting from here (instead of export default at the bottom of the file)
//means destructuring when importing as in index.js
export const Contact = () => {
  return (
    <div className={styles.main}>
      <h4>Contact Us</h4>

      <img src={mail} alt="Email icon" className={styles.contactIcon}></img>
      <p>enquiries@powderlodge.com</p>
      
      <img src={telephone} alt="Email icon" className={styles.contactIcon}></img>
      <p> 9696 999 666</p>
    </div>
  );
};