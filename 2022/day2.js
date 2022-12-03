const fs = require('fs');

const isWin = (me, opp) => {
  if (me === 'X') {
    return opp === 'C';
  }
  if (me === 'Y') {
    return opp === 'A';
  }
  return opp === 'B';
};

const findSum = (arr) => arr.reduce((total, current) => (total + current), 0);

const findCheat = (me, opp) => {
  if (me === 'X') {
    // lose
    if (opp === 'A') {
      return 'Z';
    }
    if (opp === 'B') {
      return 'X';
    }
    return 'Y';
  }
  if (me === 'Y') {
    const alter = { A: 'X', B: 'Y', C: 'Z'};
    return alter[opp];
  }
  // win
  if (opp === 'A') {
    return 'Y';
  }
  if (opp === 'B') {
    return 'Z';
  }
  return 'X';
};

fs.readFile('./day2.txt', 'utf8', (err, data) => {
  const rpsOpp = { A: 1, B: 2, C: 3 };
  const rpsMe = { X: 1, Y: 2, Z: 3 };

  const scores = data.split('\n').map((turn) => {
    const [oppChose, meChose] = turn.split(' ');
    if (rpsOpp[oppChose] === rpsMe[meChose]) {
      return rpsMe[meChose] + 3;
    }
    if (isWin(meChose, oppChose)) {
      return rpsMe[meChose] + 6;
    }
    return rpsMe[meChose];
  });

  const cheatScores = data.split('\n').map((turn) => {
    const [oppChose, meChose] = turn.split(' ');
    const meCheat = findCheat(meChose, oppChose);
    console.log({ oppChose, meChose, meCheat });
    if (rpsOpp[oppChose] === rpsMe[meCheat]) {
      return rpsMe[meCheat] + 3;
    }
    if (isWin(meCheat, oppChose)) {
      return rpsMe[meCheat] + 6;
    }
    return rpsMe[meCheat];
  });
  console.log('PART_1: ', findSum(scores));
  console.log('PART_2: ', findSum(cheatScores));
});
