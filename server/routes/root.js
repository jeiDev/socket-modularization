const fs = require("fs");

module.exports = (app) => {
    fs.readdirSync(`${rootDir}/server/routes`).filter(function (file) {
        try {
            const route = require(`${rootDir}/server/routes/${file}`);
            if(route && file !== "root.js") route(app);
        } catch (error) {
            console.log(error);
        }
    });
}