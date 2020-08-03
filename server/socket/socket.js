const fs = require("fs");

module.exports = ({socket, io}) => {
    fs.readdirSync(`${rootDir}/server/socket`).filter(function (file) {
        try {
            const Socket = require(`${rootDir}/server/socket/${file}`);
            if(Socket && file !== "root.js" && file !== "socket.js") Socket({socket, io});
        } catch (error) {
            console.log(error);
        }
    });
}