import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const params = useParams();

  return (
    <>
      <Cards pairsCount={parseInt(params.pairsCount, 10)} previewSeconds={5} mode={params.mode}></Cards>
    </>
  );
}
