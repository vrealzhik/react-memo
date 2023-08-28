import { CROSS_SUIT, DIAMONDS_SUIT, HEARTS_SUIT, SPADES_SUIT } from "../../const";
import styles from "./Card.module.css";

const images = {
  [HEARTS_SUIT]: "/assets/images/suits/hearts.svg",
  [CROSS_SUIT]: "/assets/images/suits/cross.svg",
  [SPADES_SUIT]: "/assets/images/suits/spades.svg",
  [DIAMONDS_SUIT]: "/assets/images/suits/diamonds.svg",
};

export function Card({ onClick, suit, rank, open }) {
  return (
    <button
      onClick={onClick}
      className={open ? `${styles.card} ${styles.cardOpen}` : `${styles.card} ${styles.cardClosed}`}
    >
      {open ? (
        <div className={styles.content}>
          <div className={`${styles.row1} ${styles.rank}`}>
            <div className={styles.rankContainer}>
              {rank}
              <img className={styles.rankImage} src={images[suit]} alt={suit} />
            </div>
          </div>
          <div className={styles.suit}>
            <img className={styles.suitImage} src={images[suit]} alt={suit} />
          </div>
          <div className={`${styles.flippedRank} ${styles.rank}`}>
            <div className={styles.rankContainer}>
              {rank}
              <img className={styles.rankImage} src={images[suit]} alt={suit} />
            </div>
          </div>
        </div>
      ) : (
        <img src="/assets/images/сard-shirt.svg" alt="card shirt" />
      )}
    </button>
  );
}
