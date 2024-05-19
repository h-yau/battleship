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

  it.todo('does not allow overlapping or neighbor ships'); // check if +1, -1 and [+1 +1] etc. logic is to loop through it

  describe('gameboard with ships instantiated', () => {
    beforeEach(() => {
      const coord = [3, 2];
      testboard.addShip(coord, ship(3));
    });

    it.todo('can receive attacks');
  });
});
