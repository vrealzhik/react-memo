import styles from "./Cards.module.css";

export function Cards({ cards, openAllCards, handleCardClick }) {
  return (
    <div className={styles.cards}>
      {openAllCards
        ? cards.map((card) => (
            <button
              className={`${styles.card} ${styles.cardOpen}`}
              key={card.id}
            >
              {card.rank} {card.suit}
            </button>
          ))
        : cards.map((card) => (
            <button
              onClick={() => handleCardClick(card)}
              className={
                card.open
                  ? `${styles.card} ${styles.cardOpen}`
                  : `${styles.card} ${styles.cardClosed}`
              }
              key={card.id}
            >
              {card.open ? `${card.rank} ${card.suit}` : null}
            </button>
          ))}
    </div>
  );
}
