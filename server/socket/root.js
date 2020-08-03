const chat = require("./chat");

module.exports = (server) => {
    const io = require('socket.io')(server);
    const io2 = require('socket.io-client')('http://localhost');

    [io, io2].map(io => {
        io.on('connection', socket => {
            chat({socket, io});
    
            socket.on('disconnect', () => {
                console.log("Client disconnect");
            });
        });
    })
}