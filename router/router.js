const express = require('express')
const apiRouter = new express.Router()

const userRouter = require('./user.router')

apiRouter.use(userRouter)

module.exports = apiRouter