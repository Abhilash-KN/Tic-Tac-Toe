function getAvailablePositions(grid) {
  let positions = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === " ") {
        positions.push([i, j]);
      }
    }
  }
  return positions;
}

function getPositionScore(grid) {
  for (let i = 0; i < 3; i++) {
    if (
      grid[i][0] === grid[i][1] &&
      grid[i][1] === grid[i][2] &&
      grid[i][2] !== " "
    )
      return 10;
    if (
      grid[0][i] === grid[1][i] &&
      grid[1][i] === grid[2][i] &&
      grid[2][i] !== " "
    )
      return 10;
  }
  if (
    grid[0][0] === grid[1][1] &&
    grid[1][1] === grid[2][2] &&
    grid[2][2] !== " "
  )
    return 10;
  if (
    grid[0][2] === grid[1][1] &&
    grid[1][1] === grid[2][0] &&
    grid[2][0] !== " "
  )
    return 10;
  return 0;
}

export default function findBestMove(grid, turn, d) {
  let moves = [];
  let bestMove;
  let positions = getAvailablePositions(grid);
  if (positions.length === 0) return [null, 0];
  positions.sort(() => Math.random() - 0.5);
  for (let k = 0; k < positions.length; k++) {
    let [i, j] = positions[k];
    grid[i][j] = turn;

    let score = parseInt(getPositionScore(grid) / d);
    score = d % 2 === 0 ? -score : score;
    if (score !== 0) moves.push([[i, j], score]);
    else {
      moves.push([
        [i, j],
        findBestMove(grid, turn === "x" ? "o" : "x", d + 1)[1],
      ]);
    }

    bestMove = moves[0];
    if (d % 2 === 0) {
      for (let i = 0; i < moves.length; i++) {
        if (moves[i][1] < bestMove[1]) bestMove = moves[i];
      }
    } else {
      for (let i = 0; i < moves.length; i++) {
        if (moves[i][1] > bestMove[1]) bestMove = moves[i];
      }
    }

    grid[i][j] = " ";
  }

  return bestMove;
}
