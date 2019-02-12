const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./config/secret')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(cookieParser)
app.use(logger('dev'))

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.mongoConnectionUrl, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection error');
    })


app.listen(3000, () => {
    console.log('Running on port 3000')
})