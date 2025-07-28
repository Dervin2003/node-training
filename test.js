const http = require('http');

let storedData = ''; // 🔹 Variable to hold the POSTed data

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);

  if (req.url === '/' && req.method === 'GET') {
    // 🔹 Serve HTML with the current stored data
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <h2>Send Data to Server</h2>
        <form method="POST" action="/data">
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
        <h3>Stored Data:</h3>
        <p>${storedData || 'No data yet.'}</p>
      </body>
      </html>
    `);
  }

  else if (req.url === '/about' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About page');
  }

  else if (req.url === '/data' && req.method === 'POST') {
    let body = '';
    req.setEncoding('utf8');

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      // 🔹 Parse the form data (e.g., "message=Hello+World")
      const parsed = new URLSearchParams(body);
      storedData = parsed.get('message'); // save it to the server variable
      console.log('Stored POST data:', storedData);

      // Redirect back to homepage to show stored data
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }

  else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
