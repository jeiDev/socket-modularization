const express = require('express')
const app = express();
const http = require('http').createServer(app);
const {PORT} = require("./server/utils/config");
const route = require("./server/routes/root");
const socket = require("./server/socket/root");

global.rootDir = __dirname;

app.use(express.static(`${rootDir}/public`));

route(app);
socket(http);

http.listen(PORT, () => (console.log(`Server Running in port ${PORT}...`)));