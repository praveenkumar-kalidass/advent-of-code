const fs = require('fs');

const sizes = {};

const sizeDir = (path, dir) => {
  for (let i = 0; i < Object.keys(dir).length; i++) {
    const pwd = Object.keys(dir)[i];
    const current = path + pwd;
    if (pwd === '.') {
      sizes[path] = sizes[path] ? (sizes[path] + dir[pwd]) : dir[pwd];
      continue;
    }
    sizes[path] = sizes[path] ? (sizes[path] + sizeDir(current + '/', dir[pwd])) : sizeDir(current + '/', dir[pwd]);
  }
  return sizes[path];
};

const findSum = (arr) => arr.reduce((total, current) => (total + current), 0);

fs.readFile('./day7.txt', 'utf8', (err, data) => {
  const commands = data.split('\n');
  let drive = {};
  let path;
  let parent = [];

  commands.forEach((command) => {
    if (command.includes('$ cd /')) {
      path = drive;
      return;
    }
    if (command.includes('$ cd ..')) {
      path = parent.pop();
      return;
    }
    if (command.includes('$ cd ')) {
      parent.push(path);
      path = path[command.replace('$ cd ', '')];
      return;
    }
    if (command.includes('$ ls')) {
      // nothing
      return;
    }
    if (command.includes('dir ')) {
      path[command.replace('dir ', '')] = {};
      return;
    }
    const file = parseInt(command.split(' ')[0]);
    path['.'] = path['.'] ? path['.'] + file : file;
  });

  sizeDir('/', drive);
  const firstResult = findSum(Object.values(sizes).filter(v => (v <= 100000)));
  console.log('PART_1', firstResult);

  const [total, ...directories] = Object.keys(sizes).sort((b, a) => sizes[a] - sizes[b]);
  let index = 0;
  let secondResult;
  while (sizes[directories[index]] >= (30000000 - (70000000 - sizes[total]))) {
    secondResult = sizes[directories[index]];
    index++;
  }
  console.log('PART_2', secondResult);
});
