const fs = require('fs');

const findSum = (arr) => arr.reduce((total, current) => (total + parseInt(current)), 0);

fs.readFile('./day1.txt', 'utf8', (err, data) => {
  const calories = data.split('\n\n').map((list) => findSum(list.split('\n')));
  const rank1 = Math.max(...calories);
  const rank2 = Math.max(...calories.filter((calory) => calory !== rank1));
  const rank3 = Math.max(...calories.filter((calory) => (calory !== rank1 && calory !== rank2)));
  console.log('PART_1: ', rank1);
  console.log('PART_2: ', rank1 + rank2 + rank3);
});
