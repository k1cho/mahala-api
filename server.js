const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./config/secret')
const cookieParser = require('cookie-parser')
const http = require('http');
const _ = require('lodash')

const app = express()
const port = 3001;
const server = http.createServer(app)
const io = require('socket.io')(server)

const {
    User
} = require('./helpers/UserClass')

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

require('./socket/streams')(io, User, _)
require('./socket/chat')(io)

server.listen(port)





// routes
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const userRoutes = require('./routes/user')
const followRoutes = require('./routes/follow')
const notificationsRoutes = require('./routes/notification')
const messagesRoutes = require('./routes/message')
const imagesRoutes = require('./routes/image')

app.use('/api/mahala', authRoutes)
app.use('/api/mahala/posts/', postRoutes)
app.use('/api/mahala/comments/', commentRoutes)
app.use('/api/mahala/users/', userRoutes)
app.use('/api/mahala/follows/', followRoutes)
app.use('/api/mahala/notifications/', notificationsRoutes)
app.use('/api/mahala/messages/', messagesRoutes)
app.use('/api/mahala/images/', imagesRoutes)


module.exports = app;