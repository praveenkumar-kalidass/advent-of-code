const fs = require('fs');

const shouldMoveTail = (headPos, tailPos) => {
  const [headRow, headColumn] = headPos;
  const [tailRow, tailColumn] = tailPos;
  if (
    headRow === tailRow && headColumn === tailColumn ||
    (headRow - 1) === tailRow && headColumn === tailColumn ||
    (headRow + 1) === tailRow && headColumn === tailColumn ||
    headRow === tailRow && (headColumn - 1) === tailColumn ||
    headRow === tailRow && (headColumn + 1) === tailColumn ||
    (headRow - 1) === tailRow && (headColumn - 1) === tailColumn ||
    (headRow - 1) === tailRow && (headColumn + 1) === tailColumn ||
    (headRow + 1) === tailRow && (headColumn - 1) === tailColumn ||
    (headRow + 1) === tailRow && (headColumn + 1) === tailColumn
  ) {
    return false;
  }
  return true;
};

const moveTail = (headPos, tailPos) => {
  const rowDiff = headPos[0] - tailPos[0];
  const colDiff = headPos[1] - tailPos[1];
  if (rowDiff > 0) {
    tailPos[0] += 1;
  }
  if (rowDiff < 0) {
    tailPos[0] -= 1;
  }
  if (colDiff > 0) {
    tailPos[1] += 1;
  }
  if (colDiff < 0) {
    tailPos[1] -= 1;
  }
};

fs.readFile('./day9.txt', 'utf8', (err, data) => {
  const land = {};
  const headPosition = [0, 0];
  const tailPosition = [0, 0];
  const anotherLand = {};
  const rope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

  data.split('\n').forEach((row) => {
    const [direction, steps] = row.split(' ');
    const headMap = {
      R: (position) => position[1] += 1,
      L: (position) => position[1] -= 1,
      U: (position) => position[0] += 1,
      D: (position) => position[0] -= 1,
    };

    for (let i = 1; i <= parseInt(steps); i++) {
      headMap[direction](headPosition);
      if (shouldMoveTail(headPosition, tailPosition)) {
        moveTail(headPosition, tailPosition);
      }
      land[String(tailPosition[0])] = land[String(tailPosition[0])] || {};
      land[String(tailPosition[0])][String(tailPosition[1])] = land[String(tailPosition[0])][String(tailPosition[1])] || 1;

      headMap[direction](rope[0]);
      for (let j = 1; j < rope.length; j++) {
        if (shouldMoveTail(rope[j - 1], rope[j])) {
          moveTail(rope[j - 1], rope[j]);
        }
      }
      anotherLand[String(rope[9][0])] = anotherLand[String(rope[9][0])] || {};
      anotherLand[String(rope[9][0])][String(rope[9][1])] = anotherLand[String(rope[9][0])][String(rope[9][1])] || 1;
    }
    return;
  });

  let firstResult = 0;
  Object.keys(land).forEach((row) => {
    firstResult += Object.keys(land[row]).length;
  });
  console.log('PART_1', firstResult);
  let secondResult = 0;
  Object.keys(anotherLand).forEach((row) => {
    secondResult += Object.keys(anotherLand[row]).length;
  });
  console.log('PART_2', secondResult);
});
