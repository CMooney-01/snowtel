import menu from '../../assets/icons/menu.png';
import mountain from '../../assets/icons/mountain.png';
import styles from './styles.module.css';

const handleClick = () => {
  console.log('testing');
}

export const Navbar = () => {
  return (
    <div className={styles.main}>
      <a href="/" className={styles.logo}>
        <img className={styles.icon} src={mountain} alt="Snowtel Logo"></img>
      </a>
      

      {/* <ul>
        <li>Accommodation</li>
        <li>Restaurant</li>
        <li>Things To Do</li>
        <li>Contact Us</li>
      </ul> */}

      <button className={styles.menuButton}>
        <img className={styles.icon} src={menu} alt="Menu" onClick={handleClick}></img>
      </button>
      
    </div>
  )
}