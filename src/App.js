import React, { useState } from "react";
import AnimatedBackground from "components/animation/AnimatedBackground";
import Game from "components/game/Game";
import Menu from "components/menu/Menu";
import styles from "App.module.css";

function App() {
  const [page, setPage] = useState("menu");
  const [turn, setTurn] = useState("x");
  const [grid, setGrid] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  return (
    <div className={styles.container}>
      <AnimatedBackground />
      {page === "menu" ? (
        <Menu setPage={setPage} setTurn={setTurn} />
      ) : (
        <Game playAs={turn} setPage={setPage} grid={grid} setGrid={setGrid} />
      )}
    </div>
  );
}

export default App;
