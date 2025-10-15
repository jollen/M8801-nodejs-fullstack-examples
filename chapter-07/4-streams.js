const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { Transform } = require('stream');
const { pipeline } = require('stream/promises');

(async () => {
  await fsp.mkdir(path.join(__dirname, 'dist'), { recursive: true });
  const src = path.join(__dirname, 'data/index.txt');
  const out = path.join(__dirname, 'dist/out.txt');

  // Transform: expand file list to content, uppercase, annotate line count
  let files = (await fsp.readFile(src, 'utf8')).trim().split('\n');

  const source = fs.createReadStream(src);
  const uppercase = new Transform({
    transform(chunk, enc, cb) {
      try { cb(null, chunk.toString().toUpperCase()); }
      catch (e) { cb(e); }
    }
  });

  // Compose: we will manually concatenate file contents after pipeline
  await pipeline(source, uppercase, fs.createWriteStream(out));

  // Append each file's content transformed
  for (const f of files) {
    const content = await fsp.readFile(path.join(__dirname, 'data', f), 'utf8');
    const lines = content.trim().split(/\r?\n/).length;
    await fsp.appendFile(out, `\n---- ${f} (${lines} lines) ----\n` + content.toUpperCase());
  }

  console.log('[streams] wrote', out);
})().catch(e => {
  console.error('[streams] error:', e);
  process.exit(1);
});
