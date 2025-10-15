console.log('\\n=== 6) compose / pipe（資料管線） ===');

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// 小工具
const trim = s => s.trim();
const toInt = s => parseInt(s, 10);
const clamp01 = n => Math.max(0, Math.min(1, n));
const asPercent = n => (n*100).toFixed(1) + '%';

const percentByCompose = compose(asPercent, clamp01, (n)=>n/1000, toInt, trim);
const percentByPipe    = pipe(trim, toInt, (n)=>n/1000, clamp01, asPercent);

console.log('compose:', percentByCompose('  420  '));
console.log('pipe   :', percentByPipe('  420  '));
