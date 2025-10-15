const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const index = await fs.readFile(path.join(__dirname, 'data/index.txt'), 'utf8');
    const files = index.trim().split('\n');

    const jobs = files.map(async (f) => {
      const text = await fs.readFile(path.join(__dirname, 'data', f), 'utf8');
      return { file: f, lines: text.trim().split(/\r?\n/).length };
    });

    const settled = await Promise.allSettled(jobs);
    console.log('[promises] settled:', settled);
  } catch (e) {
    console.error('[promises] fatal error:', e);
  }
})();
