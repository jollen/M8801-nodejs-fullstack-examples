console.log('\\n=== 7) debounce / throttle（模擬事件） ===');

const now = () => Date.now();

function debounce(fn, wait){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function throttle(fn, wait){
  let last = 0, t;
  return (...args) => {
    const n = now();
    if (n - last >= wait) {
      last = n;
      fn(...args);
    } else if (!t){
      t = setTimeout(() => { last = now(); t=null; fn(...args); }, wait - (n - last));
    }
  };
}

// 模擬大量事件（每 50ms 觸發一次，共 20 次）
let countRaw = 0, countDeb = 0, countThr = 0;
const raw = () => { countRaw++; };
const deb = debounce(() => { countDeb++; }, 200);
const thr = throttle(() => { countThr++; }, 200);

let fired = 0;
const id = setInterval(() => {
  fired++;
  raw(); deb(); thr();
  if (fired >= 20) {
    clearInterval(id);
    setTimeout(()=>{
      console.log('raw=', countRaw, 'debounced=', countDeb, 'throttled=', countThr);
    }, 300);
  }
}, 50);
