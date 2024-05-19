import { test, describe, it, expect, beforeEach } from '@jest/globals';
import ship from '../js/ship.js';

describe('ship factory', () => {
  it('returns an object', () => {
    expect(typeof ship(4)).toBe('object');
  });

  it('throws error when the ship is less than or equal to 0', () => {
    expect(() => ship(0)).toThrow(Error);
    expect(() => ship(-1)).toThrow(Error);
  });

  beforeEach(() => {});

  it('returns an object with correct properties', () => {
    const newShip = ship(4);
    expect(newShip.getTimesHit()).toBe(0);
    expect(newShip.isSunk()).toBe(false);
  });

  it('can take hits', () => {
    const newShip = ship(3);
    newShip.hit();
    expect(newShip.getTimesHit()).toBe(1);
  });

  it('can sink', () => {
    const newShip = ship(1);
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });
});
