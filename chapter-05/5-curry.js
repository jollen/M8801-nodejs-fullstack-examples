console.log('\\n=== 5) Currying / Partial / Closure ===');

// Closure：封存私有狀態
function makeCounter(init = 0){
  let n = init;
  return () => ++n;
}
const next = makeCounter(10);
console.log('counter:', next(), next(), next()); // 11 12 13

// Currying：f(a,b,c) -> f(a)(b)(c)
const curry = (fn) => (...args) =>
  args.length >= fn.length ? fn(...args) : (...rest) => curry(fn)(...args, ...rest);

const sum3 = (a,b,c) => a + b + c;
const curried = curry(sum3);
console.log('curried(1)(2)(3)=', curried(1)(2)(3));

// Partial Application：預綁部分參數
const partial = (fn, ...preset) => (...rest) => fn(...preset, ...rest);
const add10 = partial((a,b)=>a+b, 10);
console.log('add10(7)=', add10(7));

// 高層抽象：以函數參數塑造可組合的行為
function withRetry(fn, tries=3){
  return async (...args) => {
    let last;
    for (let i=0;i<tries;i++){
      try{ return await fn(...args); } catch(e){ last=e; }
    }
    throw last;
  };
}
async function mightFail(x){ if (Math.random()<0.7) throw new Error('flaky'); return x*2; }
withRetry(mightFail, 5)(3).then(v=>console.log('withRetry ok=', v)).catch(e=>console.log('withRetry fail=', e.message));
