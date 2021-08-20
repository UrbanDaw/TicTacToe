import React from "react";
import Board from "./Board";
import { calculateWinner } from "./solutions";

const Game = () => {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [stepCount, setStepCount] = React.useState(0);
  const [xIsNext, setXisNext] = React.useState(true);
  const winner = calculateWinner(history[stepCount]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i, e) => {
    const historyPoint = history.slice(0, stepCount + 1);
    const current = historyPoint[stepCount];
    const squares = [...current];
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepCount(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepCount(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move ${move}.` : `Go to start.`;

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  const restart = () => {
    setStepCount(0);
    setXisNext(true);
    setHistory([Array(9).fill(null)]);
  };

  const winnerOrDraw = () => {
    if (winner) {
      return `Winner: ${winner}.`;
    } else if (!winner && stepCount === 9) {
      return `Draw!`;
    }
    return `Next move: ${xO}`;
  };

  return (
    <>
      <Board squares={history[stepCount]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>
          {winnerOrDraw()}
          <button onClick={restart}>Restart</button>
        </h3>
      </div>
    </>
  );
};

export default Game;
