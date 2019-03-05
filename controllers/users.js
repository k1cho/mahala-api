const Post = require('../models/post')
const User = require('../models/user')
const Like = require('../models/like')

exports.index = (req, res, err) => {
    User
        .find({})
        .populate('posts')
        .populate('following')
        .populate('followers')
        .populate('chats.receiverId')
        .populate('chats.msgId')
        .sort({
            createdAt: -1
        })
        .exec((err, users) => {
            if (err) {
                return res.status(422).json(err)
            }

            return res.status(200).json(users)
        })
}

exports.show = (req, res, err) => {
    User
        .findOne({
            _id: req.params.id
        })
        .populate('posts')
        .populate('following')
        .populate('followers')
        .populate('chats.receiverId')
        .populate('chats.msgId')
        .sort({
            createdAt: -1
        })
        .exec((err, user) => {
            if (err) {
                return res.status(422).json(err)
            }

            return res.status(200).json(user)
        })
}

exports.getUserByUsername = (req, res, err) => {
    User
        .findOne({
            username: req.params.username
        })
        .populate('posts')
        .populate('following')
        .populate('followers')
        .populate('chats.receiverId')
        .populate('chats.msgId')
        .sort({
            createdAt: -1
        })
        .exec((err, user) => {
            if (err) {
                return res.status(422).json(err)
            }

            return res.status(200).json(user)
        })
}