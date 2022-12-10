const fs = require('fs');

fs.readFile('./day10.txt', 'utf8', (err, data) => {
  const commands = data.split('\n');

  let X = 1;
  let cycle = 0;
  let firstResult = 0;
  const interestingCycles = [20, 60, 100, 140, 180, 220];
  let interestingCycle = 20;
  commands.map((command) => {
    const [operation, value] = command.split(' ');

    cycle += 1;
    if (interestingCycles.includes(cycle)) {
      firstResult += X * cycle;
      interestingCycle += 40;
    }

    if (operation === 'addx') {
      cycle += 1;
      if (interestingCycles.includes(cycle)) {
        firstResult += X * cycle;
        interestingCycle += 40;
      }
      X += parseInt(value);
    }
  });
  console.log('PART_1', firstResult);
});

fs.readFile('./day10.txt', 'utf8', (err, data) => {
  const commands = data.split('\n');

  let cycle = 0;
  let crt = [];
  const spritePosition = [1, 2, 3];
  let secondResult = '';
  commands.map((command) => {
    const [operation, value] = command.split(' ');

    cycle += 1;
    if (spritePosition.includes(cycle % 40 || 40)) {
      crt.push('#');
    } else {
      crt.push('.');
    }
    if (!(cycle % 40)) {
      secondResult += crt.join('') + '\n';
      crt = [];
    }
    if (operation === 'addx') {
      cycle += 1;
      if (spritePosition.includes(cycle % 40 || 40)) {
        crt.push('#');
      } else {
        crt.push('.');
      }
      if (!(cycle % 40)) {
        secondResult += crt.join('') + '\n';
        crt = [];
      }
      spritePosition[0] += parseInt(value);
      spritePosition[1] += parseInt(value);
      spritePosition[2] += parseInt(value);
    }
  });
  console.log('PART_2');
  console.log(secondResult);
});
