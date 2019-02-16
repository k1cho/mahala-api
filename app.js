const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./config/secret')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())


// app headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))


// routes
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')

app.use('/api/mahala', authRoutes)
app.use('/api/mahala', postRoutes)


// mongo connection
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
mongoose.set('useCreateIndex', true);


module.exports = app;