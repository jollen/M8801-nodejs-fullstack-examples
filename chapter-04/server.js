const http = require('http');
const url = require('url');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8080;

// 房間管理：room -> Set<ws>
const rooms = new Map();

function getRoom(name = 'general') {
  if (!rooms.has(name)) rooms.set(name, new Set());
  return rooms.get(name);
}

const server = http.createServer((req, res) => {
  const u = url.parse(req.url, true);
  if (u.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('WebSocket server is running. Connect via ws://host:8080/?room=general');
  } else {
    res.writeHead(404);
    res.end('not found');
  }
});

const wss = new WebSocketServer({ server });

function broadcast(room, data, except = null) {
  const peers = rooms.get(room);
  if (!peers) return;
  for (const ws of peers) {
    if (ws !== except && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }
}

// Heartbeat
function noop(){}
function heartbeat() { this.isAlive = true; }

wss.on('connection', (ws, req) => {
  const u = url.parse(req.url, true);
  const room = (u.query && u.query.room) ? String(u.query.room) : 'general';
  const peers = getRoom(room);
  peers.add(ws);

  ws.isAlive = true;
  ws.on('pong', heartbeat);

  // 入房通知
  broadcast(room, { type: 'system', event: 'join', room, text: 'A user joined.' }, null);

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(String(raw));
      if (msg.type === 'ping') {
        // 應用層 ping（與 ws 層 ping 不同）
        ws.send(JSON.stringify({ type: 'system', event: 'pong', room }));
        return;
      }
      if (msg.type === 'message') {
        const payload = {
          type: 'message',
          room: msg.room || room,
          user: msg.user || 'guest',
          text: String(msg.text || '').slice(0, 500),
          ts: Date.now()
        };
        broadcast(payload.room, payload, null);
      } else {
        ws.send(JSON.stringify({ type: 'system', event: 'error', room, text: 'Unknown type' }));
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'system', event: 'error', room, text: 'Bad JSON' }));
    }
  });

  ws.on('close', () => {
    peers.delete(ws);
    broadcast(room, { type: 'system', event: 'leave', room, text: 'A user left.' }, null);
  });
});

// 伺服器層 heartbeat：定期 ping，清除失效連線
const interval = setInterval(() => {
  for (const [room, peers] of rooms.entries()) {
    for (const ws of peers) {
      if (ws.isAlive === false) {
        ws.terminate();
        peers.delete(ws);
        continue;
      }
      ws.isAlive = false;
      ws.ping(noop);
    }
  }
}, 30000);

wss.on('close', () => clearInterval(interval));

server.listen(PORT, () => {
  console.log('HTTP/WebSocket server listening on :' + PORT);
});
