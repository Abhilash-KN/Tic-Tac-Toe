import React, { useState } from "react";
import styles from "components/game/Game.module.css";
import PlayAsX from "./PlayAsX";
import PlayAsO from "./PlayAsO";
import PlayerVsPlayer from "./PlayerVsPlayer";

function Game(props) {
  const { grid, setGrid, setPage, playAs } = props;
  const [currentTurn, setCurrentTurn] = useState("x");
  const [strike, setStrike] = useState("noStrike");
  const [inProgress, setInProgress] = useState(true);

  function clearBoard() {
    let tempGrid = [...grid];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tempGrid[i][j] = " ";
      }
    }
    setGrid([...tempGrid]);
  }

  function quitGame() {
    clearBoard();
    setPage("menu");
  }

  function restartGame() {
    clearBoard();
    setStrike("noStrike");
    setInProgress(true);
    setCurrentTurn("x");
  }

  const gameGrid =
    playAs === "x" ? (
      <PlayAsX
        grid={grid}
        setGrid={setGrid}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        setStrike={setStrike}
        setInProgress={setInProgress}
        inProgress={inProgress}
      />
    ) : playAs === "o" ? (
      <PlayAsO
        grid={grid}
        setGrid={setGrid}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        setStrike={setStrike}
        setInProgress={setInProgress}
        inProgress={inProgress}
      />
    ) : (
      <PlayerVsPlayer
        grid={grid}
        setGrid={setGrid}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        setStrike={setStrike}
        setInProgress={setInProgress}
        inProgress={inProgress}
      />
    );

  return (
    <div className={styles.container}>
      <div className={styles.moveInfo}>{currentTurn.toUpperCase()} turn</div>
      <div className={styles.board}>{gameGrid}</div>
      <div className={styles.options}>
        <button className={styles.button} onClick={() => quitGame()}>
          Quit
        </button>
        <button className={styles.button} onClick={() => restartGame()}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Game;
