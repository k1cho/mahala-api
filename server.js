const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://bkichob:ZzK6J1LfqjbApbeP@cluster0-r1ldt.mongodb.net/test?retryWrites=true', {
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