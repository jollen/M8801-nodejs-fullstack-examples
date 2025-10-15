const http = require('http');

function start(route, handle) {
  const onRequest = (req, res) => {
    route(handle, req, res);
  };
  http.createServer(onRequest).listen(8888, () => {
    console.log('Server has started on :8888');
  });
}

exports.start = start;
