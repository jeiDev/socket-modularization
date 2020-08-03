module.exports = (app) => {
    app.get('/chat/:to', function (req, res) {
        res.sendFile('chat.html', { root: rootDir + '/public/pages' });
    })
}

