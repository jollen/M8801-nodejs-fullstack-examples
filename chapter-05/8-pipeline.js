console.log('\\n=== 8) Point-free Pipeline（資料處理） ===');

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const take = n => arr => arr.slice(0, n);
const sortBy = key => arr => [...arr].sort((a,b)=> (a[key]>b[key]?1:-1));
const map = fn => arr => arr.map(fn);
const pick = keys => obj => keys.reduce((o,k)=>(o[k]=obj[k],o), {});

const toView = pipe(
  sortBy('score'),
  take(3),
  map(pick(['name','score']))
);

const data = [
  { id:1, name:'Alpha', score: 92, extra:'x' },
  { id:2, name:'Beta',  score: 81, extra:'y' },
  { id:3, name:'Gamma', score: 87, extra:'z' },
  { id:4, name:'Delta', score: 95, extra:'w' },
];
console.log('top3 view:', toView(data));
