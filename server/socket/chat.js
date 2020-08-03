module.exports = ({socket, io}) => {
    socket.on('sendMessage', data => {
        let parse = JSON.parse(data);
        io.emit(`getMessage:${parse.userId}`, data);
    });

    socket.on('sendWriteMessage', data => {
        let parse = JSON.parse(data);
        io.emit(`getWriteMessage:${parse.userId}`, data);
    });
}