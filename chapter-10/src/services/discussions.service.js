const store = [];
// item: { id, message, timestamp }

async function create({ message }) {
  const text = String(message || '').trim();
  if (!text) {
    const err = new Error('message is required'); err.status = 400; throw err;
  }
  const item = { id: store.length + 1, message: text, timestamp: Date.now() };
  store.push(item);
  return item;
}

async function latest(n = 10) {
  return store.slice(-n).reverse();
}

module.exports = { create, latest };
