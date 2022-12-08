const fs = require('fs');

fs.readFile('./day8.txt', 'utf8', (err, data) => {
  const forest = {};
  const scenicScores = {};
  data.split('\n').forEach((row, rIndex) => {
    row.split('').forEach((column, cIndex) => {
      forest[String(rIndex + 1)] = forest[String(rIndex + 1)] || {};
      forest[String(rIndex + 1)][String(cIndex + 1)] = column;

      scenicScores[String(rIndex + 1)] = scenicScores[String(rIndex + 1)] || {};
      scenicScores[String(rIndex + 1)][String(cIndex + 1)] = 1;
    });
  });
  
  let firstResult = 99 + 99 + 97 + 97;
  for (let i = 2; i <= 98; i++) {
    for (let j = 2; j <= 98; j++) {
      const element = parseInt(forest[String(i)][String(j)]);
      let visible = false;

      let iIndex = i - 1;
      let jIndex = j;
      while (!visible && iIndex >= 1) {
        if (element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          iIndex = 0;
        }
        iIndex--;
      }
      if (iIndex === 0) {
        // console.log([i, j, element], 'top');
        visible = true;
      }

      iIndex = i + 1;
      jIndex = j;
      while (!visible && iIndex <= 99) {
        if (element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          iIndex = 100;
        }
        iIndex++;
      }
      if (iIndex === 100) {
        // console.log([i, j, element], 'bottom');
        visible = true;
      }

      iIndex = i;
      jIndex = j - 1;
      while (!visible && jIndex >= 1) {
        if (element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          jIndex = 0;
        }
        jIndex--;
      }
      if (jIndex === 0) {
        // console.log([i, j, element], 'left');
        visible = true;
      }

      iIndex = i;
      jIndex = j + 1;
      while (!visible && jIndex <= 99) {
        if (element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          jIndex = 100;
        }
        jIndex++;
      }
      if (jIndex === 100) {
        // console.log([i, j, element], 'right');
        visible = true;
      }

      if (visible) {
        firstResult += 1;
      }
    }
  }
  console.log('PART_1', firstResult);


  let secondResult;
  for (let i = 2; i <= 98; i++) {
    for (let j = 2; j <= 98; j++) {
      const element = parseInt(forest[String(i)][String(j)]);

      let iIndex = i - 1;
      let jIndex = j;
      let noOfVisibleTrees = 0;
      while (iIndex >= 1) {
        if (element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          iIndex = 0;
        }
        noOfVisibleTrees += 1;
        iIndex--;
      }
      scenicScores[i][j] = scenicScores[i][j] * noOfVisibleTrees;

      iIndex = i + 1;
      jIndex = j;
      noOfVisibleTrees = 0;
      while (iIndex <= 99) {
        if (parseInt(forest[String(iIndex)][String(jIndex)]) && element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          iIndex = 100;
        }
        noOfVisibleTrees += 1;
        iIndex++;
      }
      scenicScores[i][j] = scenicScores[i][j] * noOfVisibleTrees;

      iIndex = i;
      jIndex = j - 1;
      noOfVisibleTrees = 0;
      while (jIndex >= 1) {
        if (parseInt(forest[String(iIndex)][String(jIndex)]) && element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          jIndex = 0;
        }
        noOfVisibleTrees += 1;
        jIndex--;
      }
      scenicScores[i][j] = scenicScores[i][j] * noOfVisibleTrees;

      iIndex = i;
      jIndex = j + 1;
      noOfVisibleTrees = 0;
      while (jIndex <= 99) {
        if (parseInt(forest[String(iIndex)][String(jIndex)]) && element <= parseInt(forest[String(iIndex)][String(jIndex)])) {
          jIndex = 100;
        }
        noOfVisibleTrees += 1;
        jIndex++;
      }
      scenicScores[i][j] = scenicScores[i][j] * noOfVisibleTrees;
    }
  }
  secondResult = Math.max(...Object.keys(scenicScores).map((key) => {
    return Math.max(...Object.values(scenicScores[key]));
  }));
  console.log('PART_2', secondResult);
});
