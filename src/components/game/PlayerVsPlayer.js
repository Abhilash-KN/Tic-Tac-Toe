import React from "react";
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
              style={{ color: col === "x" ? "#6474e5" : "#f13619" }}
              className={styles.col}
              key={colIndex}
              onClick={() => makeMove(rowIndex, colIndex)}
            >
              {col === "x" ? (
                <span>&#10006;</span>
              ) : col === "o" ? (
                <span style={{ fontSize: "0.76em", fontWeight: "bolder" }}>
                  &#9711;
                </span>
              ) : (
                " "
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayerVsPlayer;
