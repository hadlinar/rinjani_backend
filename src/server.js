require('systemd');

const http = require('http')
const hostname = '0.0.0.0'  // sini
const port = 3311; // sini
// var port = process.env.LISTEN_PID > 0 ? 'systemd' : 1337; // bikin listen pid di env
// http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello World')
// }).listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// });

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen('systemd');