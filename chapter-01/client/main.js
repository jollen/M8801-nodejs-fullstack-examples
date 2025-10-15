const $ = (id) => document.getElementById(id);
const set = (id, text) => $(id).textContent = text;

function logLines(arr){ return arr.join('\n'); }

// 1) Object Literal / Prototype
function runLiteral(){
  const out = [];

  // Object literal
  const person = {
    name: 'Jollen',
    job: 'Software Developer',
    queryJob(){ return `${this.name}'s job is ${this.job}`; }
  };
  out.push(person.queryJob());

  // Prototype via Object.create
  const proto = { kind: 'Animal', speak(){ return `${this.kind} says hi`; } };
  const cat = Object.create(proto);
  cat.kind = 'Cat';
  out.push(cat.speak());

  // Prototype chain check
  out.push('cat.__proto__ === proto -> ' + (Object.getPrototypeOf(cat) === proto));

  set('out-literal', logLines(out));
}

// 2) ES6 Class with #private, getters/setters, static, extends
function runClass(){
  const out = [];

  class User {
    #password;
    constructor(name, password){
      this.name = name;
      this.#password = password;
    }
    get masked(){ return '*'.repeat(8); }
    set password(p){ this.#password = String(p); }
    verify(p){ return this.#password === p; }
    static greet(){ return 'Hello from User'; }
  }

  class Admin extends User {
    constructor(name, password){
      super(name, password);
      this.role = 'admin';
    }
    grant(){ return `${this.name} granted permission`; }
  }

  const u = new User('Alice', 's3cr3t');
  out.push(User.greet());
  out.push('u.masked=' + u.masked);
  out.push('verify("no")=' + u.verify('no'));
  u.password = 'newpass';
  out.push('verify("newpass")=' + u.verify('newpass'));

  const a = new Admin('Bob', 'root');
  out.push(a.grant());

  set('out-class', logLines(out));
}

// 3) Factory / Revealing Module
function runFactory(){
  const out = [];

  // Factory pattern
  const personFactory = (name, job) => {
    let createdAt = Date.now();
    return {
      name, job,
      queryJob(){ return `${name}'s job is ${job}`; },
      age(ms=0){ return Date.now() - createdAt + ms; }
    };
  };

  // Revealing Module（IIFE）
  const counter = (function(){
    let n = 0;
    function inc(){ n += 1; }
    function value(){ return n; }
    return { inc, value }; // reveal
  })();

  const p = personFactory('Carol', 'PM');
  out.push(p.queryJob());
  counter.inc(); counter.inc();
  out.push('counter=' + counter.value());

  set('out-factory', logLines(out));
}

// 4) Mixins / Composition vs. Inheritance
function runMixins(){
  const out = [];

  const canTalk = (o) => Object.assign(o, {
    say(text){ return `${o.name}: ${text}`; }
  });
  const canMove = (o) => Object.assign(o, {
    move(step=1){ o.pos = (o.pos||0) + step; return o.pos; }
  });

  // 組合
  const robot = canMove(canTalk({ name:'R2D2' }));
  out.push(robot.say('beep'));
  out.push('pos=' + robot.move(3));

  // 對比：繼承
  class Animal { constructor(name){ this.name = name; } speak(){ return `${this.name} sound`; } }
  class Dog extends Animal { speak(){ return `${this.name} woof`; } }
  const d = new Dog('Doge');
  out.push(d.speak());

  set('out-mixins', logLines(out));
}

// 5) this / call / apply / bind
function runThis(){
  const out = [];

  function show(greeting, punct){
    return `${greeting}, ${this.who}${punct}`;
  }
  const ctx = { who: 'World' };

  out.push('call:  ' + show.call(ctx, 'Hello', '!'));
  out.push('apply: ' + show.apply(ctx, ['Hi', '!!']));
  const bound = show.bind(ctx, 'Yo');
  out.push('bind:  ' + bound('?'));

  // 箭頭函數不綁 this（取決於封閉詞法環境）
  const obj = {
    who: 'Lexical',
    arrow: () => this && this.who,
    method(){
      const arrowInner = () => this.who;
      return arrowInner();
    }
  };
  out.push('arrow (lexical/likely undefined): ' + obj.arrow());
  out.push('method->arrowInner (this=obj): ' + obj.method());

  set('out-this', logLines(out));
}

// wire buttons
document.querySelectorAll('button[data-run]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-run');
    const map = { literal: runLiteral, class: runClass, factory: runFactory, mixins: runMixins, this: runThis };
    map[key] && map[key]();
  });
});

// auto-run first
runLiteral();
