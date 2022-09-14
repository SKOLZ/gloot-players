import styles from './styles.module.scss';

function Spinner({ className }: { className?: string }) {
  return (
    <div className={`${styles.spinner} ${className || ''}`}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

export default Spinner;
