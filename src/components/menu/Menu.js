import React from "react";
import styles from "components/menu/Menu.module.css";

function Menu(props) {
  const { setPage, setTurn } = props;

  function changePage(turn) {
    setTurn(turn);
    setPage("game");
  }
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => changePage("x")}>
        Play as X
      </button>
      <button className={styles.button} onClick={() => changePage("o")}>
        Play as O
      </button>
      <button className={styles.button} onClick={() => changePage("pvp")}>
        Play with friend
      </button>
    </div>
  );
}

export default Menu;
