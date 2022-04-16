import React from "react";
import ScoreCounter from "../components/scoreCounter";
import PlayerIndicator from "../components/PlayerIndicator";

type Player = "X" | "O" | "DRAW" | undefined;

interface Props {
  xScore: number;
  oScore: number;
  currentPlayer: Player;
  winner: Player;
}

const ScoreBoard: React.FC<Props> = ({
  xScore,
  oScore,
  currentPlayer,
  winner,
}) => {
  return (
    <div className="border flex justify-between items-center w-full">
      <ScoreCounter color="dreamer-blue" team="X" scoreValue={xScore} />
      <PlayerIndicator currentPlayer={currentPlayer} winner={winner} />
      <ScoreCounter color="dreamer-pink" team="O" scoreValue={oScore} />
    </div>
  );
};

export default ScoreBoard;
