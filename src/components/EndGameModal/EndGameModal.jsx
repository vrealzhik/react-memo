import { Link } from "react-router-dom";
import styles from "./EndGameModal.module.css";
import { convertSecondsToMinutesAndSeconds } from "../../utils";

export function EndGameModal({ isWon, gameDurationInSeconds }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon
    ? "/assets/images/celebration.png"
    : "/assets/images/dead.png";

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const { minutes, seconds } = convertSecondsToMinutesAndSeconds(
    gameDurationInSeconds
  );

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {minutes.toString().padStart("2", "0")}.
        {seconds.toString().padStart("2", "0")}
      </div>
      <Link to="/">
        <button className={styles.button}>Начать сначала</button>
      </Link>
    </div>
  );
}
