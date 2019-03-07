const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Username is required'
    },
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Password is required'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    notifications: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String
        },
        viewProfile: {
            type: Boolean,
            default: false
        },
        read: {
            type: Boolean,
            default: false
        },
        date: {
            type: String,
            default: ''
        },
        created: {
            type: Date,
            default: Date.now()
        }
    }],
    chats: [{
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        msgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    }],
    picVersion: {
        type: String,
        default: '1551971049'
    },
    picId: {
        type: String,
        default: 'default.png'
    },
    images: [{
        imgId: {
            type: String,
            default: ''
        },
        imgVersion: {
            type: String,
            default: ''
        }
    }],


})

module.exports = mongoose.model('User', userSchema)