const User = require('../models/user')

exports.follow = (req, res, err) => {
    const followUser = async () => {
        await User.updateOne({
            _id: req.user._id,
            'following._id': {
                $ne: req.body.userId
            }
        }, {
            $push: {
                following: req.body.userId
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
                followers: req.user._id,
                notifications: {
                    sender: req.user._id,
                    message: req.user.username + ' followed you.',
                    created: new Date(),
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

exports.unfollow = (req, res, err) => {
    const unfollowUser = async () => {
        await User.updateOne({
            _id: req.user._id
        }, {
            $pull: {
                following: req.body.userId
            }
        }).then().catch(() => {
            return res.status(422).json({
                message: 'Cannot update following: Cannot unfollow a User that you are not following.'
            })
        })

        await User.updateOne({
            _id: req.body.userId
        }, {
            $pull: {
                followers: req.user._id
            }
        }).then().catch(() => {
            return res.status(422).json({
                message: 'Cannot update followers: Cannot unfollow a User that you are not following.'
            })
        })
    }

    unfollowUser().then(() => {
        return res.status(201).json({
            message: 'User unfollowed'
        })
    }).catch(() => {
        return res.status(422).json({
            message: 'Something went wrong'
        })
    })
}