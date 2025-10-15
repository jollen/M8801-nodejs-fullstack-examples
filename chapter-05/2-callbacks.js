console.log('\\n=== 2) Error-first Callback ===');

function asyncWork(x, cb){
  setTimeout(() => {
    if (x < 0) return cb(new Error('x must be >= 0'));
    cb(null, Math.sqrt(x));
  }, 100);
}

// 巢狀回呼易讀性差、錯誤傳遞容易漏掉
asyncWork(9, (err, r1) => {
  if (err) return console.error('[callback1]', err.message);
  asyncWork(r1, (err, r2) => {
    if (err) return console.error('[callback2]', err.message);
    console.log('callback chain result=', r2.toFixed(4));
  });
});
