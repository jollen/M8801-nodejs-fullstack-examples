const fs = require('fs/promises');
const path = require('path');

async function readIndex() {
  const text = await fs.readFile(path.join(__dirname, 'data/index.txt'), 'utf8');
  return text.trim().split('\n');
}

async function readOne(file) {
  const text = await fs.readFile(path.join(__dirname, 'data', file), 'utf8');
  return { file, chars: text.length };
}

(async () => {
  try {
    const files = await readIndex();

    // 串行（保序）
    const serial = [];
    for (const f of files) {
      serial.push(await readOne(f));
    }
    console.log('[await] serial:', serial.map(x => x.file));

    // 併行（提速）
    const parallel = await Promise.all(files.map(readOne));
    console.log('[await] parallel total chars:', parallel.reduce((s,x)=>s+x.chars, 0));
  } catch (e) {
    console.error('[await] error:', e);
  }
})();
