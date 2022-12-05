const fs = require('fs');

fs.readFile('./day5.txt', 'utf8', (err, data) => {
  const [, rows] = data.split('\n\n');

  const containers1 = {
    LIST_1: ['F', 'H', 'M', 'T', 'V', 'L', 'D'],
    LIST_2: ['P', 'N', 'T', 'C', 'J', 'G', 'Q', 'H'],
    LIST_3: ['H', 'P', 'M', 'D', 'S', 'R'],
    LIST_4: ['F', 'V', 'B', 'L'],
    LIST_5: ['Q', 'L', 'G', 'H', 'N'],
    LIST_6: ['P', 'M', 'R', 'G', 'D', 'B', 'W'],
    LIST_7: ['Q', 'L', 'H', 'C', 'R', 'N', 'M', 'G'],
    LIST_8: ['W', 'L', 'C'],
    LIST_9: ['T', 'M', 'Z', 'J', 'Q', 'L', 'D', 'R'],
  };
  const containers2 = {
    LIST_1: ['F', 'H', 'M', 'T', 'V', 'L', 'D'],
    LIST_2: ['P', 'N', 'T', 'C', 'J', 'G', 'Q', 'H'],
    LIST_3: ['H', 'P', 'M', 'D', 'S', 'R'],
    LIST_4: ['F', 'V', 'B', 'L'],
    LIST_5: ['Q', 'L', 'G', 'H', 'N'],
    LIST_6: ['P', 'M', 'R', 'G', 'D', 'B', 'W'],
    LIST_7: ['Q', 'L', 'H', 'C', 'R', 'N', 'M', 'G'],
    LIST_8: ['W', 'L', 'C'],
    LIST_9: ['T', 'M', 'Z', 'J', 'Q', 'L', 'D', 'R'],
  };

  rows.split('\n').forEach((row) => {
    const [moveTimes, fromTo] = row.split(' from ');
    const times = moveTimes.replace('move ', '');
    const [from, to] = fromTo.split(' to ');
    for (let index = 0; index < times; index++) {
      const letter = containers1[`LIST_${from}`].shift();
      containers1[`LIST_${to}`].unshift(letter);
    }
  });

  console.log('PART_1: ', Object.keys(containers1).map(k => containers1[k][0]).join(''));

  rows.split('\n').forEach((row) => {
    const [moveTimes, fromTo] = row.split(' from ');
    const times = moveTimes.replace('move ', '');
    const [from, to] = fromTo.split(' to ');

    const letters = containers2[`LIST_${from}`].join('').substr(0, times);
    containers2[`LIST_${from}`].splice(0, times);
    containers2[`LIST_${to}`] = (letters + containers2[`LIST_${to}`].join('')).split('');
  });

  console.log('PART_2: ', Object.keys(containers2).map(k => containers2[k][0]).join(''));
});
