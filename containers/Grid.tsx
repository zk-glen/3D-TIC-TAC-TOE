import React from "react";
import Square from "../components/Square";

const Grid = (squareIds: number[]) => {
  return (
    <div className="grid">
      {squares.map((item) => {
        <Square
          winner={winner}
          key={i}
          onClick={() => setSquareValue(i)}
          value={squares[i]}
        />;
      })}
    </div>
  );
};

export default Grid;
