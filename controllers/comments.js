const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

exports.store = (req, res) => {
    Comment.create({
        comment: req.body.comment.comment,
        post: req.body.post,
        user: req.user._id,
    }).then(comment => {

        Post.updateOne({
            _id: req.body.post
        }, {
            $push: {
                comments: comment._id
            }
        }).then().catch(err => console.log(err))

        User.updateOne({
            _id: req.user._id
        }, {
            $push: {
                comments: comment._id
            }
        }).then().catch(err => console.log(err))

    }).catch(() => {
        return res.status(422).json({
            message: 'Could not create the comment.'
        })
    })
}