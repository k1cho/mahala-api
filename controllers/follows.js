const Post = require('../models/post')
const User = require('../models/user')
const Like = require('../models/like')

exports.follow = (req, res, err) => {
    const followUser = async () => {
        await User.updateOne({
            _id: req.user._id,
            'following._id': {
                $ne: req.body.userId
            }
        }, {
            $push: {
                following: {
                    _id: req.body.userId
                }
            }
        }).then().catch(() => {
            return res.status(422).json({
                message: 'Cannot update following: Cannot follow a User that you already followed.'
            })
        })

        await User.updateOne({
            _id: req.body.userId,
            'followers._id': {
                $ne: req.user._id
            }
        }, {
            $push: {
                followers: {
                    _id: req.user._id
                }
            }
        }).then().catch(() => {
            return res.status(422).json({
                message: 'Cannot update followers: Cannot follow a User that you already followed.'
            })
        })
    }

    followUser().then(() => {
        return res.status(201).json({
            message: 'User followed'
        })
    }).catch(() => {
        return res.status(422).json({
            message: 'Something went wrong'
        })
    })
}