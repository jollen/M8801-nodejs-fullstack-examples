const server = require('./server');
const router = require('./router');
const handlers = require('./handlers');

const handle = new Map();
handle.set('GET /', handlers.home);
handle.set('GET /hello', handlers.hello);
handle.set('GET /time', handlers.time);
handle.set('POST /echo', handlers.echo);

server.start(router.route, handle);
