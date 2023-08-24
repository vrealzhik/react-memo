import styles from "./Cards.module.css";
import { Card } from "../Card/Card";

export function Cards({ cards, openAllCards, handleCardClick }) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Card
          key={card.id}
          onClick={openAllCards ? () => {} : () => handleCardClick(card)}
          open={openAllCards ? true : card.open}
          suit={card.suit}
          rank={card.rank}
        />
      ))}
    </div>
  );
}
