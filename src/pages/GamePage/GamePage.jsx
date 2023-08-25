import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { convertSecondsToMinutesAndSeconds, generateDeck } from "../../utils";
import { useParams } from "react-router-dom";
import styles from "./GamePage.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Cards } from "../../components/Cards/Cards";
import { Button } from "../../components/Button/Button";

const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
const STATUS_PREVIEW = "STATUS_PREVIEW";

const PREVIEW_SECONDS = 5;

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

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(STATUS_LOST);
  }
  function resetGame() {
    setTimer(0);
    setGameStartDate(null);
    setGameEndDate(null);
    setStatus(STATUS_PREVIEW);
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
      finishGame(STATUS_LOST);
      return;
    }

    // yсловие победы
    const playerWon = newCards.every((card) => card.open);

    if (playerWon) {
      finishGame(STATUS_WON);
      return;
    }
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

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
      if (isGameEnded) {
        const timerValue = getSecondsDiff(gameEndDate, gameStartDate);

        setTimer(timerValue);
        return;
      }

      if (status === STATUS_IN_PROGRESS) {
        const timerValue = getSecondsDiff(new Date(), gameStartDate);

        setTimer(timerValue);
        return;
      }

      setTimer(0);
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate, gameEndDate, isGameEnded, status]);

  const { minutes, seconds } = convertSecondsToMinutesAndSeconds(timer);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>
                Игра начнется через {PREVIEW_SECONDS} секунд
              </p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS ? (
          <Button onClick={resetGame}>Начать заново</Button>
        ) : null}
      </div>

      <Cards
        cards={cards}
        handleCardClick={handleCardClick}
        openAllCards={status !== STATUS_IN_PROGRESS}
      />

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationInSeconds={timer}
          />
        </div>
      ) : null}
    </div>
  );
}
