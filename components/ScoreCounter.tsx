import React from "react";

interface Props {
  color: string;
  scoreValue: number;
  team: string;
}

const ScoreCounter: React.FC<Props> = ({ color, scoreValue, team }) => {
  return (
    <div className={`border flex flex-col items-center bg-${color}`}>
      <h4>{team}</h4>
      <p>{scoreValue}</p>
    </div>
  );
};

export default ScoreCounter;
