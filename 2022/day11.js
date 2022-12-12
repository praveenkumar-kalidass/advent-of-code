const fs = require('fs');

fs.readFile('./day11.txt', 'utf8', (err, data) => {
  let monkeys = {};
  let currentMonkey;
  const monkeyOperations = {};
  const operations = {
    '+': (value) => (item) => item + value,
    '*': (value) => (item) => item * value,
    'old': () => (item) => item * item,
  };
  const monkeyDivisibles = {};
  const trueDivisibles = {};
  const falseDivisibles = {};
  data.split('\n').forEach((row) => {
    if (row.match(/Monkey/)) {
      monkeys[row.split(' ')[1].replace(':','')] = [];
      currentMonkey = row.split(' ')[1].replace(':','');
      return;
    }
    if (row.match(/Starting items:/)) {
      monkeys[currentMonkey] = row.split(': ')[1].split(', ').map(v => parseInt(v));
      return;
    }
    if (row.match(/Operation:/)) {
      let operation = row.split('old ')[1][0];
      if (row.split('old ')[1].match(/old/)) {
        operation = 'old';
      }
      monkeyOperations[currentMonkey] = operations[operation](parseInt(row.split('old ')[1].split(' ')[1]));
      return;
    }
    if (row.match(/Test:/)) {
      monkeyDivisibles[currentMonkey] = (item) => item % parseInt(row.split('by ')[1]);
      return;
    }
    if (row.match(/true:/)) {
      trueDivisibles[currentMonkey] = row.split('monkey ')[1];
      return;
    }
    if (row.match(/false:/)) {
      falseDivisibles[currentMonkey] = row.split('monkey ')[1];
      return;
    }
  });

  const monkeyInspections = {};
  const tempMonkeys = {};
  Object.keys(monkeys).forEach(k => {
    tempMonkeys[k] = [];
    monkeyInspections[k] = 0;
  });

  let round = 1;
  while (round <= 20) {
    Object.keys(monkeys).forEach((monkeyNo) => {
      monkeys[monkeyNo] = [...monkeys[monkeyNo], ...tempMonkeys[monkeyNo]];
      tempMonkeys[monkeyNo] = [];
      monkeys[monkeyNo].forEach((worryLevel) => {
        monkeyInspections[monkeyNo] += 1;
        let worry = monkeyOperations[monkeyNo](worryLevel);
        worry = Math.floor(worry / 3);
        if (monkeyDivisibles[monkeyNo](worry)) {
          tempMonkeys[falseDivisibles[monkeyNo]].push(worry);
          return;
        }
        tempMonkeys[trueDivisibles[monkeyNo]].push(worry);
      });
      monkeys[monkeyNo] = [];
    });
    monkeys = {...tempMonkeys};
    Object.keys(monkeys).forEach(k => tempMonkeys[k] = []);
    round++;
  }

  const [top1, top2] = Object.values(monkeyInspections).sort((a, b) => b - a);
  const firstResult = top1 * top2;
  console.log('PART_1', firstResult);
});
