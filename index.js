const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require("body-parser");
const router = express.Router();
const url = require('url');

app.use(express.static("public"))

const firebase_function = require("./firebase_functions")
// FIREBASE CONFIG FILES

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get('/fbtest', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "firebasetest.html"));
})


app.post('/createUser', (req, res) => {
    let q = url.parse(req.url, true);
    let username = q.query['username'];
    let email = q.query['email'];
    let password = q.query['password'];
    console.log("creating user");
    let result = firebase_function.createUser(username, email, password);
    if (typeof result != "undefined") {
        console.log("OK");
        // send to next page
    } else {
        res.send(result);
    }
})

app.post('/login', (req, res) => {
    let q = url.parse(req.url, true);
    let email = q.query['email'];
    let password = q.query['password'];
})

app.get('/signout', (req, res) => {
    firebase_function.signOut();
})


app.listen(8000, () => {
    console.log('listen on port 8000')
})