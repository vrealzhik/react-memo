import { CROSS_SUIT, DIAMONDS_SUIT, HEARTS_SUIT, SPADES_SUIT } from "../../const";
import styles from "./Card.module.css";

import heartsImageUrl from "./images/hearts.svg";
import crossImageUrl from "./images/cross.svg";
import spadesImageUrl from "./images/spades.svg";
import diamondsImageUrl from "./images/diamonds.svg";
import cardShirtImageUrl from "./images/сard-shirt.svg";

const images = {
  [HEARTS_SUIT]: heartsImageUrl,
  [CROSS_SUIT]: crossImageUrl,
  [SPADES_SUIT]: spadesImageUrl,
  [DIAMONDS_SUIT]: diamondsImageUrl,
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
        <img src={cardShirtImageUrl} alt="card shirt" />
      )}
    </button>
  );
}
