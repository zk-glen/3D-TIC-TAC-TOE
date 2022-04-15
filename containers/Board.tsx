import { useEffect, useState } from "react";
import Square from "../components/Square";

type Player = "X" | "O" | "DRAW" | undefined;

const getRandomPlayer = () => (Math.round(Math.random() * 1) === 1 ? "X" : "O");

function Board() {
  const [squares, setSquares] = useState(Array(27).fill(undefined));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    getRandomPlayer()
  );

  const [scoreO, setScoreO] = useState(0);
  const [scoreX, setScoreX] = useState(0);

  const [winner, setWinner] = useState<Player>(undefined);

  function reset() {
    setSquares(Array(27).fill(undefined));
    setWinner(undefined);
    setCurrentPlayer(getRandomPlayer());
    setScoreX(0);
    setScoreO(0);
  }

  function calculateWinner(squares: Player[]) {
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
    setScoreX(x);
    setScoreO(o);
  }

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    calculateWinner(squares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  let allSquares = new Array(27).fill(undefined).map((_, i) => {
    return (
      <Square
        winner={winner}
        key={i}
        onClick={() => setSquareValue(i)}
        value={squares[i]}
      />
    );
  });

  useEffect(() => {
    const w = calculateWinner(squares);
  }, [currentPlayer]);

  return (
    <div>
      {!winner && <p>Current Player is {currentPlayer}</p>}
      {winner && winner !== "DRAW" && <p>Congratulations {winner}!</p>}
      {winner && winner === "DRAW" && <p>It's a draw!</p>}
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
      <div className="scores">
        <div>X Score {scoreX}</div>
        <div>O Score {scoreO}</div>
      </div>
      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
}

export default Board;
