import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { generateDeck } from "../../utils";
import { useParams } from "react-router-dom";
import styles from "./GamePage.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";

const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
const STATUS_PREVIEW = "STATUS_PREVIEW";

const PREVIEW_SECONDS = 0;

function getSecondsDiff(date1, date2) {
  return Math.floor((date1.getTime() - date2.getTime()) / 1000);
}

export function GamePage() {
  const { pairsCount } = useParams();

  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState(STATUS_PREVIEW);
  const [timer, setTimer] = useState(0);
  const [gameStartDate, setGameStartDate] = useState(null);
  const [gameEndDate, setGameEndDate] = useState(null);

  function goToLostState() {
    setGameEndDate(new Date());
    setStatus(STATUS_LOST);
  }

  const handleCardClick = (clickedCard) => {
    // 1. На поле открыто нечетное количество карт: сравнить текущую с открытой без половинки и возможен проигрыш\продолжение
    // 2. На поле открыто ЧЕТНОЕ количество карт: просто открыть текущую карту

    const newCards = cards.map((card) => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    // Условие проигрыша:
    // есть две откртые карты без пары которые отличаются по масти и номиналу

    const openCardWithoutPair = newCards
      .filter((card) => card.open)
      .filter((card, index, arr) => {
        // найти в arr количество карт с такой мастью и рангом как у card
        const sameCardsArray = arr.filter(
          (openCard) =>
            card.suit === openCard.suit && card.rank === openCard.rank
        );

        if (sameCardsArray.length < 2) {
          return true;
        }
        return false;
      });

    setCards(newCards);

    // условие поражения
    const playerLost = openCardWithoutPair.length >= 2;
    if (playerLost) {
      goToLostState();
      return;
    }

    // yсловие победы
    const playerWon = newCards.every((card) => card.open);

    if (playerWon) {
      setGameEndDate(new Date());
      setStatus(STATUS_WON);
      return;
    }
  };

  useEffect(() => {
    if (status === STATUS_PREVIEW) {
      const pairsCountNumber = parseInt(pairsCount);

      if (pairsCountNumber > 36) {
        alert("Столько пар сделать невозможно");
        return;
      }

      setCards(() => {
        return shuffle(generateDeck(pairsCountNumber, 10));
      });

      const timerId = setTimeout(() => {
        setGameStartDate(new Date());
        setStatus(STATUS_IN_PROGRESS);
      }, PREVIEW_SECONDS * 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [status, pairsCount]);

  useEffect(() => {
    if (!gameStartDate) {
      return;
    }

    const intervalId = setInterval(() => {
      const timerValue = getSecondsDiff(new Date(), gameStartDate);

      setTimer(timerValue);
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate]);

  return (
    <div className={styles.container}>
      {status === STATUS_PREVIEW ? (
        <>
          <h3>
            Запомните карты, через {PREVIEW_SECONDS} секунд мы их перевернем и
            вам нужно будет найти все пары
          </h3>
          <div className="cards">
            {cards.map((card) => (
              <button className="card -open" key={card.id}>
                {card.rank} {card.suit}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {status === STATUS_IN_PROGRESS ? (
        <div className="cards">
          <div>{timer}</div>
          {cards.map((card) => (
            <button
              onClick={() => handleCardClick(card)}
              className={card.open ? "card -open" : "card -closed"}
              key={card.id}
            >
              {card.open ? `${card.rank} ${card.suit}` : null}
            </button>
          ))}
        </div>
      ) : null}

      {status === STATUS_LOST || status === STATUS_WON ? (
        <>
          <div className="cards">
            {cards.map((card) => (
              <button className="card -open" key={card.id}>
                {card.rank} {card.suit}
              </button>
            ))}
          </div>
          <div className={styles.modalContainer}>
            <EndGameModal
              isWon={status === STATUS_WON}
              gameDurationInSeconds={getSecondsDiff(gameEndDate, gameStartDate)}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
