import React, { useState } from "react";
import styles from "components/game/Game.module.css";
import findBestMove from "engine/FindBestMove";
import getGameStatus from "engine/GetGameStatus";

function PlayAsX(props) {
  const {
    grid,
    setGrid,
    currentTurn,
    setCurrentTurn,
    inProgress,
    setStrike,
    setInProgress,
  } = props;

  const [paused, setPaused] = useState(false);

  function makeMove(i, j) {
    if (grid[i][j] === " " && inProgress && !paused) {
      setPaused(true);
      let tempGrid = [...grid];
      tempGrid[i][j] = currentTurn;
      let nextTurn = currentTurn === "x" ? "o" : "x";
      setCurrentTurn(nextTurn);
      setGrid([...tempGrid]);
      let [winner, strike] = getGameStatus(grid);
      if (strike) setStrike(strike);
      if (winner !== "p") {
        setInProgress(false);
      } else {
        setTimeout(() => {
          let move = findBestMove(tempGrid, nextTurn, 1)[0];
          if (move) {
            tempGrid[move[0]][move[1]] = nextTurn;
            nextTurn = nextTurn === "x" ? "o" : "x";
            setCurrentTurn(nextTurn);
            setGrid([...tempGrid]);
            let [winner, strike] = getGameStatus(grid);
            if (strike) setStrike(strike);
            if (winner !== "p") {
              setInProgress(false);
            }
          }
          setTimeout(() => {
            setPaused(false);
          }, 500);
        }, 500);
      }
    }
  }

  return (
    <div className={styles.gameGrid}>
      {grid.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map((col, colIndex) => (
            <div
              className={styles.col}
              key={colIndex}
              onClick={() => makeMove(rowIndex, colIndex)}
            >
              {col.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayAsX;
