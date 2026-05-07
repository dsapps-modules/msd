const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'frontend', 'build', 'web');
const port = 3001;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.svg':
      return 'image/svg+xml';
    case '.ico':
      return 'image/x-icon';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.wasm':
      return 'application/wasm';
    case '.map':
      return 'application/json; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', contentType(filePath));
    res.end(data);
  });
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let filePath = path.join(root, urlPath);

  if (urlPath.endsWith('/')) {
    filePath = path.join(root, urlPath, 'index.html');
  }

  const normalized = path.normalize(filePath);
  if (!normalized.startsWith(root)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(normalized, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(res, normalized);
      return;
    }

    const fallback = path.join(root, 'index.html');
    sendFile(res, fallback);
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Frontend web server listening on http://127.0.0.1:${port}`);
});
