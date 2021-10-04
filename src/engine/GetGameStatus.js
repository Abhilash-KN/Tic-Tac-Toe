export default function getGameStatus(grid) {
  for (let i = 0; i < 3; i++) {
    if (
      grid[i][0] === grid[i][1] &&
      grid[i][1] === grid[i][2] &&
      grid[i][2] !== " "
    )
      return [grid[i][0], "r" + i];
    if (
      grid[0][i] === grid[1][i] &&
      grid[1][i] === grid[2][i] &&
      grid[2][i] !== " "
    )
      return [grid[0][i], "c" + i];
  }
  if (
    grid[0][0] === grid[1][1] &&
    grid[1][1] === grid[2][2] &&
    grid[2][2] !== " "
  )
    return [grid[1][1], "ld"];
  if (
    grid[0][2] === grid[1][1] &&
    grid[1][1] === grid[2][0] &&
    grid[2][0] !== " "
  )
    return [grid[1][1], "rd"];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === " ") {
        return ["p", null];
      }
    }
  }
  return ["d", null];
}
