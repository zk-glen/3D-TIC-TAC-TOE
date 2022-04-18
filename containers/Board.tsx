import { useEffect, useState } from "react";
import Square from "../components/Square";
import Grid from "./Grid";
import Button from "../components/Button";
import ScoreBoard from "./ScoreBoard";

type Player = "X" | "O" | "DRAW" | undefined;

interface GameData {
  squares: any[];
  numberofTurns: number;
  currentPlayer: "X" | "O";
  oScore: number;
  xScore: number;
  winner: Player;
  vertical: boolean;
}

const getRandomPlayer = () => (Math.round(Math.random() * 1) === 1 ? "X" : "O");

function Board() {
  const [gameData, setGameData] = useState<GameData>({
    squares: Array(27).fill(undefined),
    numberofTurns: 0,
    currentPlayer: getRandomPlayer(),
    oScore: 0,
    xScore: 0,
    winner: undefined,
    vertical: false,
  });

  function reset(): void {
    setGameData({
      ...gameData,
      squares: Array(27).fill(undefined),
      numberofTurns: 0,
      currentPlayer: getRandomPlayer(),
      oScore: 0,
      xScore: 0,
      winner: undefined,
    });
  }

  function calculateWinner(squares: Player[]): void {
    const lines = [
      // TOP BOARD - 8
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],

      // MIDDLE BOARD - 8
      [9, 10, 11],
      [12, 13, 14],
      [15, 16, 17],
      [9, 12, 15],
      [10, 13, 16],
      [11, 4, 17],
      [9, 13, 17],
      [11, 13, 15],

      // BOTTOM BOARD - 8
      [18, 19, 20],
      [21, 22, 23],
      [24, 25, 26],
      [18, 21, 24],
      [19, 22, 25],
      [20, 23, 26],
      [18, 22, 26],
      [20, 22, 24],
      //3D Verticals - 9
      [0, 9, 18],
      [1, 10, 19],
      [2, 11, 20],
      [3, 12, 21],
      [4, 13, 22],
      [5, 14, 23],
      [6, 15, 24],
      [7, 16, 25],
      [8, 17, 26],
      // 3D Horizontal Diagonals - 6
      [0, 10, 20],
      [2, 10, 18],
      [3, 13, 23],
      [5, 13, 21],
      [6, 16, 26],
      [8, 16, 24],
      // 3D Vertical Diagonals - 6
      [0, 12, 24],
      [6, 12, 18],
      [1, 13, 25],
      [7, 13, 19],
      [2, 14, 26],
      [8, 14, 20],
      // 3D Diagonals - 4
      [0, 13, 26],
      [8, 13, 18],
      [6, 13, 20],
      [2, 13, 24],
      // Total 49 possibilities
    ];
    let x = 0;
    let o = 0;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        squares[a] === "X" ? (x += 1) : (o += 1);
      }
    }
    setGameData({ ...gameData, oScore: o, xScore: x });
  }

  function setSquareValue(index: number): void {
    const newData = gameData.squares.map((val, i) => {
      if (i === index) {
        return gameData.currentPlayer;
      }
      return val;
    });

    calculateWinner(gameData.squares);
    setGameData({
      ...gameData,
      squares: newData,
      numberofTurns: (gameData.numberofTurns += 1),
      winner:
        gameData.numberofTurns !== 27
          ? undefined
          : gameData.oScore === gameData.xScore
          ? "DRAW"
          : gameData.oScore < gameData.xScore
          ? "X"
          : "O",
      currentPlayer: gameData.currentPlayer === "X" ? "O" : "X",
    });
  }

  let allSquares = gameData.squares.map((_, i) => {
    return (
      <Square
        winner={gameData.winner}
        key={i}
        onClick={() => setSquareValue(i)}
        value={gameData.squares[i]}
      />
    );
  });

  useEffect(() => {
    const w = calculateWinner(gameData.squares);
  }, [gameData.currentPlayer]);

  return (
    <div className="flex flex-col items-center gap-8">
      <ScoreBoard
        xScore={gameData.xScore}
        oScore={gameData.oScore}
        currentPlayer={gameData.currentPlayer}
        winner={gameData.winner}
      />
      <div
        className={`flex flex-col ${
          gameData.vertical ? "flex-col" : " lg:flex-row"
        } gap-20`}
      >
        <Grid position="TOP">{allSquares.slice(0, 9)}</Grid>
        <Grid position="MIDDLE">{allSquares.slice(9, 18)}</Grid>
        <Grid position="BOTTOM">{allSquares.slice(18, 27)}</Grid>
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
