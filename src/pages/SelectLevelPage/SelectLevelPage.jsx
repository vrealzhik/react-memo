import { Link } from "react-router-dom";

export function SelectLevelPage() {
  return (
    <div>
      <h1>Выбери сложность</h1>
      <ul>
        <li>
          <Link to="/game/3">Только сюжет</Link>
        </li>
        <li>
          <Link to="/game/6">Сюжет и драки</Link>
        </li>
        <li>
          <Link to="/game/9">На смерть</Link>
        </li>
      </ul>
    </div>
  );
}
