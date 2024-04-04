import styles from "./LeaderItem.module.css";

const LeaderItem = () => {
  return (
    <div className={styles.leaderBox}>
      <div className={styles.leaderBoxHeader}>
        <div className={styles.posBox}>
          <p className={styles.pos}>Позиция</p>
          <p className={styles.pers}>Пользователь</p>
        </div>
        <p className={styles.time}>Время</p>
      </div>
    </div>
  );
};

export default LeaderItem;
