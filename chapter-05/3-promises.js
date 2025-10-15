console.log('\\n=== 3) Promise ===');

const asyncWork = (x) => new Promise((resolve, reject) => {
  setTimeout(() => x < 0 ? reject(new Error('x must be >= 0')) : resolve(Math.sqrt(x)), 60);
});

asyncWork(16)
  .then(v => asyncWork(v))
  .then(v => console.log('promise chain result=', v.toFixed(4)))
  .catch(e => console.error('[promise]', e.message));

Promise.allSettled([ asyncWork(4), asyncWork(-1) ])
  .then(res => console.log('allSettled=', res.map(x => x.status)));
