const fs = require('fs/promises');
const path = require('path');

function pLimit(concurrency) {
  const queue = [];
  let active = 0;

  const next = () => {
    if (active >= concurrency) return;
    const job = queue.shift();
    if (!job) return;
    active++;
    job().finally(() => {
      active--;
      next();
    });
  };

  return function run(fn) {
    return new Promise((resolve, reject) => {
      queue.push(() => fn().then(resolve, reject));
      // tick
      process.nextTick(next);
    });
  };
}

(async () => {
  const files = (await fs.readFile(path.join(__dirname, 'data/index.txt'), 'utf8')).trim().split('\n');
  const limit = pLimit(2); // 限制同時最多 2 個任務

  const timedRead = (file) => async () => {
    const ms = 200 + Math.floor(Math.random() * 400);
    await new Promise(r => setTimeout(r, ms)); // 模擬 I/O 延遲
    const text = await fs.readFile(path.join(__dirname, 'data', file), 'utf8');
    return { file, delay: ms, size: text.length };
  };

  const tasks = files.map(f => limit(timedRead(f)));
  const results = await Promise.all(tasks);
  console.log('[concurrency] results (max=2):', results);
})().catch(e => {
  console.error('[concurrency] error:', e);
});
