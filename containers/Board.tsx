import { useState } from "react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  return <div>This is the board</div>;
}

export default Board;
