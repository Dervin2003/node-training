const http = require('http');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Set common headers
  res.setHeader('Content-Type', 'application/json');

  if (url === '/api') {
    switch (method) {
      case 'GET':
        res.writeHead(200);
        res.end(JSON.stringify({ method: 'GET', message: 'Fetched data successfully' }));
        break;

      case 'POST':
        let postData = '';
        req.on('data', chunk => {
          postData += chunk;
        });
        req.on('end', () => {
          res.writeHead(201);
          res.end(JSON.stringify({ method: 'POST', message: 'Data created', data: postData }));
        });
        break;

      case 'PUT':
        let putData = '';
        req.on('data', chunk => {
          putData += chunk;
        });
        req.on('end', () => {
          res.writeHead(200);
          res.end(JSON.stringify({ method: 'PUT', message: 'Data replaced', data: putData }));
        });
        break;

      case 'PATCH':
        let patchData = '';
        req.on('data', chunk => {
          patchData += chunk;
        });
        req.on('end', () => {
          res.writeHead(200);
          res.end(JSON.stringify({ method: 'PATCH', message: 'Data updated', data: patchData }));
        });
        break;

      case 'DELETE':
        res.writeHead(200);
        res.end(JSON.stringify({ method: 'DELETE', message: 'Data deleted' }));
        break;

      case 'OPTIONS':
        res.writeHead(204, {
          'Allow': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        });
        res.end();
        break;

      default:
        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start the server
server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});


