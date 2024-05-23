import { test, describe, it, expect, beforeEach } from '@jest/globals';
import gameboard from '../js/gameboard.js';
import ship from '../js/ship.js';

describe('gameboard factory', () => {
  let testboard;

  beforeEach(() => {
    testboard = gameboard();
  });
  it('returns an object', () => {
    expect(typeof testboard).toBe('object');
  });

  it('can detect empty cell', () => {
    const coord = [3, 2];
    expect(testboard.isOccupied(coord)).toBe(false);
  });

  it('can detect occupied cell from vertical ship', () => {
    const coord = [3, 2];
    testboard.addShip(coord, ship(3));

    expect(testboard.isOccupied(coord)).toBe(true);
    expect(testboard.isOccupied([3, 3])).toBe(true);
    expect(testboard.isOccupied([3, 4])).toBe(true);
    expect(testboard.isOccupied([3, 5])).toBe(false);
  });

  it('can detect occupied cell from horizontal ship', () => {
    const coord = [3, 2];
    testboard.addShip(coord, ship(3, false));

    expect(testboard.isOccupied(coord)).toBe(true);
    expect(testboard.isOccupied([4, 2])).toBe(true);
    expect(testboard.isOccupied([5, 2])).toBe(true);
    expect(testboard.isOccupied([6, 2])).toBe(false);
  });

  it('can detect out of bound ships', () => {
    const coords = [
      [10, 10],
      [9, 9],
      [-1, -1],
    ];

    coords.forEach((coord) => {
      expect(() => testboard.addShip(coord, ship(3, false))).toThrow(Error);
    });
  });

  // check if +1, -1 and [+1 +1] etc. logic is to loop through it
  it('does not allow overlapping or neighbor ships', () => {
    const successCoord = [3, 2];
    const overlapingCoord = [3, 3];
    const horizontalNeighborCoord = [2, 2];
    const verticalNeighborCoord = [3, 0];
    const diagonalNeighborCoord = [2, 1];

    expect(() => testboard.addShip(successCoord, ship(3))).not.toThrow(Error);

    expect(() => testboard.addShip(overlapingCoord, ship(3))).toThrow(Error);
    expect(() => testboard.addShip(horizontalNeighborCoord, ship(3))).toThrow(
      Error
    );
    expect(() => testboard.addShip(verticalNeighborCoord, ship(2))).toThrow(
      Error
    );
    expect(() => testboard.addShip(diagonalNeighborCoord, ship(1))).toThrow(
      Error
    );
    expect(() =>
      testboard.addShip(diagonalNeighborCoord, ship(2, false))
    ).toThrow(Error);
  });

  describe('gameboard with ships instantiated', () => {
    it('can receive attacks on empty cells', () => {
      const coord = [3, 2];
      testboard.receiveAttack(coord);
      expect(testboard.isOccupied(coord)).toBe(true);
    });

    it('can receive attacks on ship', () => {
      const coord = [3, 2];
      const testShip = ship(3);
      testboard.addShip(coord, testShip);
      expect(testboard.isOccupied(coord)).toBe(true);

      testboard.receiveAttack([3, 2]);
      expect(testShip.getTimesHit()).toBe(1);

      testboard.receiveAttack([3, 3]);
      expect(testShip.getTimesHit()).toBe(2);

      testboard.receiveAttack([3, 4]);
      expect(testShip.getTimesHit()).toBe(3);
      expect(testShip.isSunk()).toBe(true);
    });

    it('can reveal neighboring cells after ship has sunk', () => {
      const coord = [3, 2];
      const testShip = ship(3);
      testboard.addShip(coord, testShip);

      testboard.receiveAttack([3, 2]);
      testboard.receiveAttack([3, 3]);
      testboard.receiveAttack([3, 4]);

      const neighboringCells = [
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [3, 1],
        [3, 5],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
      ];

      neighboringCells.forEach((cell) => {
        expect(testboard.isOccupied(cell)).toBe(true);
      });
    });
  });
});
