const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    post: {
        type: String,
        required: 'Post cannot be empty.'
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
})

module.exports = mongoose.model('Post', postSchema)