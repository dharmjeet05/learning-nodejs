const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer(function(req, res) {
  const method = req.method;
  const path = req.url;

  const log = `\n[${Date.now()}]: ${method} ${path}`
  fs.appendFileSync('log.txt', log, 'utf-8')

  switch(method) {
    case 'GET':
      {
        switch(path) {
          case '/':
            return res.writeHead(200).end('Hello from the server');
          case '/contact-us':
            return res.writeHead(200).end('Sure, Email: dharmjeetvaishnav@gmail.com and Phone: +91 99999 99999')
          case '/tweet':
            return res.writeHead(200).end('Tweet-1\nTweet-2')
        }
      }
      break;
    case 'POST':
      switch(path) {
        case '/tweet':
          return res.writeHead(201).end('your tweet was created')
      }
  }

  return res.writeHead(404).end('youre lost man!')
})

server.listen(8000, function() {
  console.log(`HTTP server is up and running at port 8000`)
})