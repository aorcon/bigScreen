(function(){

var server = require('net').createServer();
var port = 9998;
var user = require('./user');
var location = require('./location');
var _ = require('underscore');
var logger = require('../utils/log').getLogger();


var recvMessage = function(data){
    var message = JSON.parse(data.toString('utf8'));
    var ds = message.ds;
    _.each(ds, (obj) => {
        var name = user.getUserName(obj.da);
        // console.log(` RECV mac : [${obj.da}], user : [${name}]`);
        location.saveLocationData(obj.da, obj);
    })
    // console.log(message);
}
var connection = function(socket) {
    logger.info(`NewConnection CONNECTED ${socket.remoteAddress} : ${socket.remotePort}`);
    socket.on('data', recvMessage);
}


server.on('listening', () => {
    logger.debug('Server is listening on port', port);
});
server.on('connection', connection);
server.on('close', () => {
    logger.info('Server is now closed');
});
server.on('error', (err) => {
    logger.info('Error occurred:', err.message);
});
server.listen(port);

module.exports = server;

}.call(this));
