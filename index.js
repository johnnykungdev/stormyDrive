const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
//router
const apiRouter = require('./router/router')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"))
app.use(apiRouter)

app.get('*', (req, res) => {
    console.log("send file");
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(process.env.PORT, () => {
    console.log('listen on port 8000')
})