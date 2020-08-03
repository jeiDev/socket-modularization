module.exports = (app) => {
    app.post("/account", (req, res) => {
        res.send("Good");
    })
}