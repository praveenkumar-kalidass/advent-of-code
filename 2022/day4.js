const fs = require('fs');

fs.readFile('./day4.txt', 'utf8', (err, data) => {
  let unionOverlaps = 0;
  data.split('\n').forEach((row) => {
    const [firstElf, secondElf] = row.split(',');
    const [firstAssignmentStart, firstAssignmentEnd] = firstElf.split('-').map(v => parseInt(v));
    const [secondAssignmentStart, secondAssignmentEnd] = secondElf.split('-').map(v => parseInt(v));

    if (firstAssignmentStart >= secondAssignmentStart && firstAssignmentEnd <= secondAssignmentEnd) {
      unionOverlaps += 1;
      return;
    }
    if (secondAssignmentStart >= firstAssignmentStart && secondAssignmentEnd <= firstAssignmentEnd) {
      unionOverlaps += 1;
      return;
    }
  });
  console.log('PART_1: ', unionOverlaps);

  let intersectionOverlaps = 0;
  data.split('\n').forEach((row) => {
    const [firstElf, secondElf] = row.split(',');
    const [firstAssignmentStart, firstAssignmentEnd] = firstElf.split('-').map(v => parseInt(v));
    const [secondAssignmentStart, secondAssignmentEnd] = secondElf.split('-').map(v => parseInt(v));

    if (firstAssignmentStart >= secondAssignmentStart && firstAssignmentStart <= secondAssignmentEnd) {
      intersectionOverlaps += 1;
      return;
    }
    if (firstAssignmentEnd >= secondAssignmentStart && firstAssignmentEnd <= secondAssignmentEnd) {
      intersectionOverlaps += 1;
      return;
    }
    if (secondAssignmentStart >= firstAssignmentStart && secondAssignmentStart <= firstAssignmentEnd) {
      intersectionOverlaps += 1;
      return;
    }
    if (secondAssignmentEnd >= firstAssignmentStart && secondAssignmentEnd <= firstAssignmentEnd) {
      intersectionOverlaps += 1;
      return;
    }
  });
  console.log('PART_2: ', intersectionOverlaps);
});