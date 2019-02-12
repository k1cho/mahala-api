const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./config/secret')

const app = express()

const authRoutes = require('./routes/auth')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/api/mahala', authRoutes)

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

module.exports = app;