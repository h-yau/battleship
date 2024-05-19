const ship = (len, isVertical = true) => {
  if (len <= 0) throw new Error('Invalid length!');

  let _timesHit = 0;

  const isSunk = () => len <= _timesHit;

  return {
    getLength: () => len,
    getTimesHit: () => _timesHit,
    isSunk,
    hit: () => {
      if (isSunk()) throw new Error("Already sunk! Can't get hit");
      _timesHit++;
    },
    isVertical,
  };
};

export default ship;
