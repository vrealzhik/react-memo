import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./LeaderBoard.module.css";
import { getLeaders } from "../../api";
import { useEffect } from "react";

const LeaderBoard = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/");
  };
  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const response = await getLeaders();
      console.log(response);
    } catch (error) {
      console.log(error.message);
      alert("Ошибка сервера, попробуйте позже");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Лидерборд</p>
        <Button onClick={startGame}>Начать игру</Button>
      </div>
      <div className={styles.leaderBox}>
        <div className={styles.leaderBoxHeader}>
          <div className={styles.posBox}>
            <p className={styles.pos}>Позиция</p>
            <p className={styles.pers}>Пользователь</p>
          </div>
          <p className={styles.time}>Время</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
