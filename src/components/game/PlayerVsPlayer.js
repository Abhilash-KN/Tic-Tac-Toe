import React, { useState } from "react";
import styles from "components/game/Game.module.css";
import getGameStatus from "engine/GetGameStatus";

function PlayerVsPlayer(props) {
  const {
    grid,
    setGrid,
    currentTurn,
    setCurrentTurn,
    setStrike,
    setInProgress,
    inProgress,
  } = props;

  function makeMove(i, j) {
    if (grid[i][j] === " " && inProgress) {
      let tempGrid = [...grid];
      tempGrid[i][j] = currentTurn;
      setCurrentTurn(currentTurn === "x" ? "o" : "x");
      setGrid([...tempGrid]);
      let [winner, strike] = getGameStatus(grid);
      if (strike) setStrike(strike);
      if (winner !== "p") setInProgress(false);
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

export default PlayerVsPlayer;
