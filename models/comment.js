const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: 'Comment cannot be empty.'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

module.exports = mongoose.model('Comment', commentSchema)