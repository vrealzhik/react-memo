import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { pairsCount } = useParams();

  return (
    <>
      <Cards pairsCount={pairsCount} previewSeconds={5}></Cards>
    </>
  );
}
