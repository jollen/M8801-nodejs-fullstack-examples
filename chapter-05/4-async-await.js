console.log('\\n=== 4) async/await（串行 vs 併行） ===');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const asyncWork = async (x) => { await sleep(50); if (x<0) throw new Error('x must be >= 0'); return Math.sqrt(x); };

(async () => {
  try {
    // 串行（保序、較慢）
    const a = await asyncWork(9);
    const b = await asyncWork(a);
    console.log('await serial=', b.toFixed(4));

    // 併行（提速）
    const [x, y] = await Promise.all([asyncWork(25), asyncWork(36)]);
    console.log('await parallel sum=', (x+y).toFixed(4));

    // 錯誤處理
    try {
      await asyncWork(-1);
    } catch (e) {
      console.log('await caught error=', e.message);
    }
  } catch (e) {
    console.error('[await fatal]', e.message);
  }
})();
