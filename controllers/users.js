const Post = require('../models/post')
const User = require('../models/user')
const Like = require('../models/like')

exports.index = (req, res, err) => {
    User
        .find({})
        .populate('posts')
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