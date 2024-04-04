import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  const [diff, setDiff] = useState(null);
  const [mode, setMode] = useState(null);

  const diffChange = e => {
    setDiff(e.target.value);
  };

  const modeChange = e => {
    setMode(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <form className={styles.complex} onChange={e => diffChange(e)}>
          <input className={styles.complesNum} type="radio" id="choice1" name="diff" value="3" />
          <label htmlFor="choice1">1</label>
          <input className={styles.complesNum} type="radio" id="choice2" name="diff" value="6" />
          <label htmlFor="choice2">2</label>
          <input className={styles.complesNum} type="radio" id="choice3" name="diff" value="9" />
          <label htmlFor="choice3">3</label>
        </form>
        <p className={styles.moodTitle}>Выбери режим игры</p>
        <form className={styles.moodForm} onChange={e => modeChange(e)}>
          <input type="radio" id="mode1" name="mode" value="easy" />
          <label htmlFor="mode1" data-tooltip="У тебя будет право на ошибку">
            easy
          </label>
          <input type="radio" id="mode2" name="mode" value="hard" />
          <label htmlFor="mode2" data-tooltip="Игра до первой ошибки">
            hard
          </label>
        </form>
        <Link to={`/game/${diff}/${mode}`}>
          <button className={styles.startBtn}>Старт</button>
        </Link>
      </div>
    </div>
  );
}
