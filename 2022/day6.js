const fs = require('fs');

fs.readFile('./day6.txt', 'utf8', (err, data) => {
  let firstResult;
  data.split('').some((letter, index) => {
    let found = {};
    const word = data.substr(index, 4);
    for (let i = 0; i < 4; i++) {
      if (found[word[i]]) {
        found[word[i]] = found[word[i]] + 1;
      } else {
        found[word[i]] = 1;
      }
    }
    if (Object.keys(found).length === 4) {
      firstResult = index + 4;
      return true;
    }
  });
  console.log('PART_1', firstResult);

  let secondResult;
  data.split('').some((letter, index) => {
    let found = {};
    const word = data.substr(index, 14);
    for (let i = 0; i < 14; i++) {
      if (found[word[i]]) {
        found[word[i]] = found[word[i]] + 1;
      } else {
        found[word[i]] = 1;
      }
    }
    if (Object.keys(found).length === 14) {
      secondResult = index + 14;
      return true;
    }
  });
  console.log('PART_2', secondResult);
});
