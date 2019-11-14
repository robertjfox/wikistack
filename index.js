const express = require('express')
const app = express()

app.get("/", (req, res) => {
    console.log("hello world")
    res.send("hello world")
})

const PORT = 2468

app.listen(PORT, () => {
    console.log(`whats up ${PORT}`)
})