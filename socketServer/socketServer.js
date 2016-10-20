var net = require('net');
var location = require('./location');

var server = net.createServer((socket) => {
    console.log('CONNECTED: ' +
        socket.remoteAddress + ':' + socket.remotePort);
    socket.on('error', (err) => {
        console.log('Socket error:', err);
    });
    socket.on('data', (data) => {
        console.log('Socket Read :', data.toString('utf8'));
    })
}).on('error', (err) => {
  // handle errors here
  console.log(err);
});



// grab a random port.
server.listen(9998, () => {
  console.log('opened server on', server.address());
});
