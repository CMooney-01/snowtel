import ferry1 from '../../assets/images/ferry1.jpg';
import snow1 from '../../assets/images/snow1.jpg';
import snow2 from '../../assets/images/snow2.jpg';
import snowboard2 from '../../assets/images/snowboard2.jpg';
import styles from './styles.module.css';
//exporting from here (instead of export default at the bottom of the file)
//means destructuring when importing as in index.js
export const Home = () => {
  return (
    <div className={styles.main}>
      <div>
        <h5>Welcome to Powder Lodge</h5>
      </div>

      <div>
        <img src={snow1} alt="Snowy landscape" className={styles.homeImages}></img>
      </div>
      <p>Escape to a winter wonderland</p>
      <hr />
      <div>
        <a href="/activities">
          <div className={styles.findoutmoreCard}>
            <img src={snowboard2} alt="Two people at the snow." className={styles.findoutmoreImages}></img>
            <h4>LOCAL ACTIVITIES</h4>
            <p>This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Hey, take a look at the earthlings. Goodbye!</p>
            <hr />
          </div>
        </a>

        <a href="/contact">
          <div className={styles.findoutmoreCard}>
            <img src={ferry1} alt="A ferry on the water." className={styles.findoutmoreImages}></img>
            <h4>GETTING HERE</h4>
            <p> Drive us out of here! I gave it a cold? I gave it a virus. A computer virus. I gave it a cold? I gave it a virus. A computer virus.</p>
            <hr />
          </div>
        </a>

        <a href="/dining">
          <div className={styles.findoutmoreCard}>
            <img src={snow2} alt="Looking across a lake at a mountain." className={styles.findoutmoreImages}></img>
            <h4>DINE WITH US</h4>
            <p>Eventually, you do plan to have dinosaurs on your dinosaur tour, right? You really think you can fly that thing? God help us, we're in the hands of engineers.</p>
            <hr />
          </div>
        </a>
      </div>

      <div>Div 3</div>
    </div>
  );
};
