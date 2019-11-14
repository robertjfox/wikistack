const express = require('express')
const app = express()
const layout = require('./views/layout')
const models = require("./models")
const { addPage, editPage, main, userList, userPages, wikiPage } = require("./views/index.js")
const { db } = require('./models/index.js');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')


db.authenticate().
    then(() => {
        console.log('connected to the databaaaaase')
    }
)

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended : false }))

app.use('/user', userRouter)
app.use('/wiki', wikiRouter)

app.get('/', (req, res) => {
    res.redirect('/wiki')
})

const PORT = 2468

app.get("/", (req, res) => {
    res.send(layout())
})

const init = async () => {
    await models.db.sync()

    app.listen(PORT, () => {
        console.log(`Server is lisssnin on port ${PORT}`)
    })
}

init()

// app.listen(PORT, () => {
//     console.log(`whats up ${PORT}`)
// })