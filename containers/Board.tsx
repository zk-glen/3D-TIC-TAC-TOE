import { useEffect, useState } from "react";
import Square from "../components/Square";

type Player = "X" | "O" | "DRAW" | undefined;

interface GameData {
  squares: any[];
  numberofTurns: number;
  currentPlayer: "X" | "O";
  oScore: number;
  xScore: number;
  winner: Player;
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
  });

  function reset(): void {
    setGameData({
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
    <div>
      <div className="border flex justify-between w-full">
        <div className="border flex flex-col items-center">
          <h4>X{"\n"}SCORE</h4>
          <p>{gameData.xScore}</p>
        </div>
        <div className=" border flex flex-col items-center">
          <h4>O{"\n"} SCORE</h4>
          <p>{gameData.oScore}</p>
        </div>
      </div>
      {!gameData.winner && <p>Current Player is {gameData.currentPlayer}</p>}
      {gameData.winner && gameData.winner !== "DRAW" && (
        <p>Congratulations {gameData.winner}!</p>
      )}
      {gameData.winner && gameData.winner === "DRAW" && <p>It's a draw!</p>}
      <div className="container">
        <div>
          <h4>TOP</h4>
          <div className="grid">{allSquares.slice(0, 9)}</div>
        </div>
        <div>
          <h4>MIDDLE</h4>
          <div className="grid">{allSquares.slice(9, 18)}</div>
        </div>
        <div>
          <h4>BOTTOM</h4>
          <div className="grid">{allSquares.slice(18, 27)}</div>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300"
        onClick={reset}
      >
        RESET
      </button>
    </div>
  );
}

export default Board;
