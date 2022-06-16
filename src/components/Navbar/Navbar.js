import { useState } from 'react';
import menu from '../../assets/icons/menu.png';
import mountain from '../../assets/icons/mountain.png';
import styles from './styles.module.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  }

  return (
    <nav className={styles.main}>
      
      <div className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <img className={styles.icon} src={mountain} alt="Snowtel Logo"></img>
        </a>

        <p>powder lodge</p>
        
        <button className={styles.menuButton}>
          <img className={styles.icon} src={menu} alt="Menu" onClick={handleClick}></img>
        </button>
      </div>


      <div className={isMenuOpen ? styles.dropdownOpen : styles.dropdownClosed}>

        <a href="/accommodation" className={styles.dropdownItem}>Accommodation</a>
        <a href="/dining" className={styles.dropdownItem}>Restaurant</a>
        <a href="/activities" className={styles.dropdownItem}>Things To Do</a>
        <a href="/contact" className={styles.dropdownItem}>Contact Us</a>
 
      </div>
      
    </nav>
  )
}