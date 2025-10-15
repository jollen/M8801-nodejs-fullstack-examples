const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

// 1) Callback 風格的錯誤
function readMissingCallback(cb) {
  fs.readFile(path.join(__dirname, 'data', 'not-exists.txt'), 'utf8', (err, data) => {
    if (err) return cb(err);
    cb(null, data);
  });
}

// 2) 包裝為 Promise
function readMissingPromise() {
  return new Promise((resolve, reject) => {
    readMissingCallback((err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

(async () => {
  // A. try/catch 捕捉 async error
  try {
    await fsp.readFile(path.join(__dirname, 'data', 'not-exists.txt'), 'utf8');
  } catch (e) {
    console.error('[errors] await catch:', e.code);
  }

  // B. Promise 拒絕集中處理
  readMissingPromise().catch(e => {
    console.error('[errors] promise catch:', e.code);
  });

  // C. 未捕捉拒絕（示範用；正常專案請註冊 handler 並上報）
  // process.on('unhandledRejection', (reason) => {
  //   console.error('[errors] unhandledRejection:', reason);
  // });
})();
