import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? "/assets/images/celebration.png" : "/assets/images/dead.png";

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
    </div>
  );
}
