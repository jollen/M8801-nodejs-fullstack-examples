const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const indexPath = path.join(dataDir, 'index.txt');

fs.readFile(indexPath, 'utf8', (err, list) => {
  if (err) return console.error('[index read error]', err);
  const files = list.trim().split('\n');
  let pending = files.length;
  const results = [];

  files.forEach((fname, i) => {
    fs.readFile(path.join(dataDir, fname), 'utf8', (err, content) => {
      if (err) { results[i] = { file: fname, error: err.message }; }
      else { results[i] = { file: fname, length: content.trim().length }; }
      pending--;
      if (pending === 0) {
        console.log('[callbacks] done:', results);
      }
    });
  });
});
