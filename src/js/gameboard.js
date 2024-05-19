const gameboard = () => {
  const _side = 10;
  const _board = Array.from({ length: _side }, () => Array(_side).fill(null));

  const _missedAttacks = 0;

  const addShip = (coord, ship) => {
    const [x, y] = coord;
    const shipLength = ship.getLength();

    // check x and y
    if (x < 0 || x >= _side || x + shipLength > _side)
      throw new Error('Invalid coordinate');
    if (y < 0 || y >= _side || y + shipLength > _side)
      throw new Error('Invalid coordinate');

    // if vertical
    if (ship.isVertical) {
      if (y + shipLength >= _side)
        throw new Error('Invalid coordinate! Does not fit on the board!');

      for (let i = y; i < y + shipLength; i++) {
        _board[x][i] = 1;
      }
    } else {
      // if horizontal
      if (x + shipLength >= _side)
        throw new Error('Invalid coordinate! Does not fit on the board!');

      for (let i = x; i < x + shipLength; i++) {
        _board[i][y] = 1;
      }
    }
  };

  const isOccupied = (coord) => {
    const [x, y] = coord;
    return _board[x][y] !== null;
  };

  return { isOccupied, addShip };
};
export default gameboard;
