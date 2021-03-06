import React, { useState, useEffect } from "react";
import styles from "components/game/Game.module.css";
import findBestMove from "engine/FindBestMove";
import getGameStatus from "engine/GetGameStatus";

function PlayAsO(props) {
  const {
    grid,
    setGrid,
    currentTurn,
    setCurrentTurn,
    inProgress,
    setStrike,
    setInProgress,
    newGame,
  } = props;

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(true);
    setTimeout(() => {
      let move = findBestMove([...grid], "x", 1)[0];
      if (move) {
        let tempGrid = [...grid];
        tempGrid[move[0]][move[1]] = "x";
        let nextTurn = "o";
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
    // eslint-disable-next-line
  }, [newGame]);

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
        setPaused(false);
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

export default PlayAsO;
