import styles from './styles.module.css';

//exporting from here (instead of export default at the bottom of the file)
//means destructuring when importing as in index.js
export const App = () => {
  return (
    <div className={styles.name}>
      <h2>Snowtel</h2>
      <div>Div 1</div>
      <div>Div 2</div>
      <div>Div 3</div>
    </div>
  );
};
