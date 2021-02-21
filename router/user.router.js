const express = require('express')
const userRouter = new express.Router()

const { signInExisting } = require('../firebase_functions')

userRouter.post('/user/login', (req, res) => {
    const { email, password } = req.body
    signInExisting(email, password)
    .then((user) => {
        res.status(200).send(user)
    })
    .catch((error) => {
        res.status(400).send(error)
    })
})

module.exports = userRouter