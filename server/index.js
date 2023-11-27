const express = require("express");

const PORT = 8888;

const app = express();

app.get("/api/test", (req, res) => {
    res.json({message: "You hit the end point"})
})


app.listen(PORT);