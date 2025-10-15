console.log('\\n=== 1) Lambda / IIFE / Arrow / HOF ===');

// IIFE：立即執行函數表達式（封裝區域作用域）
(function(){
  const hidden = 42;
  console.log('IIFE hidden =', hidden);
})();

// Arrow + 隱式回傳
const add = (a, b) => a + b;
console.log('add(2,3)=', add(2,3));

// HOF：把函數當作值傳遞
function applyTwice(fn, x){ return fn(fn(x)); }
const inc = x => x + 1;
console.log('applyTwice(inc, 5)=', applyTwice(inc, 5));

// map/filter/reduce：純函式處理陣列
const nums = [1,2,3,4,5];
const doubled = nums.map(x => x*2);
const evens = nums.filter(x => x%2===0);
const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log({ doubled, evens, sum });
