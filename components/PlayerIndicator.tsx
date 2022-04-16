import React from "react";

type Player = "X" | "O" | "DRAW" | undefined;

interface Props {
  currentPlayer: Player;
  winner: Player;
}

const PlayerIndicator: React.FC<Props> = ({ currentPlayer, winner }) => {
  return (
    <>
      {!winner && <h2>Current Player is {currentPlayer}</h2>}
      {winner && winner !== "DRAW" && <h2>Congratulations {winner}!</h2>}
      {winner && winner === "DRAW" && <h2>It's a draw!</h2>}
    </>
  );
};

export default PlayerIndicator;
