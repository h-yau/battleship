// -1 is missed shots. 0 is a hit  shot to the ship. Else, it stores the ship to be retreived later

const gameboard = () => {
  const _side = 10;
  const _board = Array.from({ length: _side }, () => Array(_side).fill(null));
  const _ships = new Map();

  const isOccupied = (coord) => {
    const [x, y] = coord;
    return _board[x][y] !== null;
  };

  const addShip = (coord, ship) => {
    const [x, y] = coord;
    const shipLength = ship.getLength();

    // first validate if the ship can be placed on the coord

    // check x and y if they will go out of bound
    if (x < 0 || x >= _side) throw new Error('Invalid coordinate');
    if (y < 0 || y >= _side) throw new Error('Invalid coordinate');

    // if vertical
    if (ship.isVertical) {
      // check if new ship will go out of bound
      if (y + shipLength >= _side)
        throw new Error('Invalid coordinate! Does not fit on the board!');

      // check if all its neighbors and itself are occupied

      // i is vertical, and j is horizontal
      for (let i = y - 1; i < y + shipLength + 2; i++) {
        // if outside of the edges, no need to check
        if (i < 0) continue;
        if (i >= _side) break;
        for (let j = x - 1; j < x + 2; j++) {
          if (j < 0) continue;
          if (j >= _side) continue;

          if (isOccupied([j, i]))
            throw new Error('Ships cannot be placed next to each other!');
        }
      }

      // update board so the appropriate coords are occupied
      const shipCoords = [];
      for (let i = y; i < y + shipLength; i++) {
        _board[x][i] = ship;
        shipCoords.push([x, i]);
      }
      _ships.set(ship, shipCoords);
    } else {
      // if horizontal

      // check if new ship will go out of bound
      if (x + shipLength >= _side)
        throw new Error('Invalid coordinate! Does not fit on the board!');

      // check if all its neighbors and itself are occupied

      // i is horizontal, and j is vertical
      for (let i = x - 1; i < x + shipLength + 2; i++) {
        // if outside of the edges, no need to check
        if (i < 0) continue;
        if (i >= _side) break;
        for (let j = y - 1; j < y + 2; j++) {
          if (j < 0) continue;
          if (j >= _side) continue;

          if (isOccupied([i, j]))
            throw new Error('Ships cannot be placed next to each other!');
        }
      }

      // update board so the appropriate coords are occupied
      const shipCoords = [];
      for (let i = x; i < x + shipLength; i++) {
        _board[i][y] = ship;
        shipCoords.push([i, y]);
      }
      _ships.set(ship, shipCoords);
    }
  };

  const revealNeighbors = (coords) => {
    coords.forEach(([x, y]) => {
      // first check for out-of-bounds

      // i is the x coord
      for (let i = x - 1; i < x + 2; i++) {
        if (i < 0 || i >= _side) continue;

        // j is the y coord
        for (let j = y - 1; j < y + 2; j++) {
          if (j < 0 || j >= _side) continue;
          _board[i][j] = _board[i][j] === null ? -1 : _board[i][j];
        }
      }
    });
  };

  const userHasLost = () => {
    // TODO
    console.log('I lost!');
  };

  const receiveAttack = (coord) => {
    const [x, y] = coord;
    if (!isOccupied(coord)) {
      // record missed shot
      _board[x][y] = -1;
    } else {
      if (_board[x][y] <= 0) {
        throw new Error(
          'Invalid attack! You cannot attack the same place twice!'
        );
      }
      const ship = _board[x][y];
      _board[x][y] = 0;
      ship.hit();

      if (ship.isSunk()) {
        // Set all neighboring cells to -1
        revealNeighbors(_ships.get(ship));
        // afterwards, delete the ship
        _ships.delete(ship);

        if (_ships.size === 0) userHasLost();
      }
    }
  };

  return { isOccupied, addShip, receiveAttack };
};
export default gameboard;
