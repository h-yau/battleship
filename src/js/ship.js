const ship = (len) => {
  const _length = len;
  if (_length <= 0) throw new Error('Invalid length!');

  let _timesHit = 0;

  const isSunk = () => _length <= _timesHit;

  return {
    getLength: () => _length,
    getTimesHit: () => _timesHit,
    isSunk,
    hit: () => {
      if (isSunk()) throw new Error("Already sunk! Can't get hit");
      _timesHit++;
    },
  };
};

export default ship;
