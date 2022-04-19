import { useEffect, useState } from "react";
import { Grid, Square } from "../Grid";
import { Button } from "../Common";
import ScoreBoard from "../ScoreBoard/ScoreBoardContainer";
import {
  ChooseRandomPlayer,
  CalculateWinningCombinations,
  CheckForWinner,
} from "../../utils";
import { Player } from "../../ts/types/player_types";

interface GameData {
  squaresData: Player[];
  numberOfTurns: number;
  currentPlayer: "X" | "O";
  scores: {
    oScore: number;
    xScore: number;
  };
  winner: Player;
  vertical: boolean;
}

function Board() {
  // Setting inital data
  const [gameData, setGameData] = useState<GameData>({
    squaresData: Array(27).fill(undefined), //Creates an empty array of length 29
    numberOfTurns: 0,
    currentPlayer: ChooseRandomPlayer(),
    scores: {
      oScore: 0,
      xScore: 0,
    },
    winner: undefined,
    vertical: false,
  });

  //  Sets the squareData to the current player
  function updateSquareData(indexOfCurrentSquare: number): void {
    const updatedSquaresData = gameData.squaresData.map(
      (SquareInSquareArray, i) => {
        if (i === indexOfCurrentSquare) {
          return gameData.currentPlayer;
        }
        return SquareInSquareArray;
      }
    );
    setGameData({
      ...gameData,
      squaresData: updatedSquaresData,
      numberOfTurns: (gameData.numberOfTurns += 1),
      winner: CheckForWinner(
        gameData.numberOfTurns,
        gameData.scores.xScore,
        gameData.scores.oScore
      ),
      currentPlayer: gameData.currentPlayer === "X" ? "O" : "X",
    });
  }

  // Assigning a square to each position in the gameData, can't do earlier as
  let squares: JSX.Element[] = gameData.squaresData.map(
    (_, i): JSX.Element => (
      <Square
        key={i}
        onClick={() => updateSquareData(i)}
        value={gameData.squaresData[i]}
      />
    )
  );

  //  Reset the game data
  function reset(): void {
    setGameData({
      ...gameData,
      squaresData: Array(27).fill(undefined),
      numberOfTurns: 0,
      currentPlayer: ChooseRandomPlayer(),
      scores: {
        oScore: 0,
        xScore: 0,
      },
      winner: undefined,
    });
  }

  useEffect(() => {
    setGameData({
      ...gameData,
      scores: CalculateWinningCombinations(gameData.squaresData),
    });
  }, [gameData.currentPlayer]);

  return (
    <div className="flex flex-col items-center gap-8">
      <ScoreBoard
        xScore={gameData.scores.xScore}
        oScore={gameData.scores.oScore}
        currentPlayer={gameData.currentPlayer}
        winner={gameData.winner}
      />
      <div
        className={`flex flex-col ${
          gameData.vertical ? "flex-col" : " lg:flex-row"
        } gap-20`}
      >
        <Grid position="TOP">{squares.slice(0, 9)}</Grid>
        <Grid position="MIDDLE">{squares.slice(9, 18)}</Grid>
        <Grid position="BOTTOM">{squares.slice(18, 27)}</Grid>
      </div>
      <div className="flex flex-col justify-center gap-5 lg:flex-row">
        <Button text="Reset Board" alternateStyle={false} onClick={reset} />
        <Button
          text="Toggle Board"
          alternateStyle={true}
          onClick={() =>
            setGameData({ ...gameData, vertical: !gameData.vertical })
          }
        />
      </div>
    </div>
  );
}

export default Board;
