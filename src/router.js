import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectLevelPage />,
  },
  {
    path: "/game/:pairsCount",
    element: <GamePage />,
  },
]);
