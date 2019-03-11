const User = require('../models/user')
const moment = require('moment')
const bcrypt = require('bcryptjs')

exports.index = (req, res, err) => {
    User
        .find({})
        .populate('posts')
        .populate('following')
        .populate('followers')
        .populate('chats.receiverId')
        .populate('chats.msgId')
        .populate('notifications.sender')
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
        .populate('notifications.sender')
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
        .populate('posts.user')
        .populate('following')
        .populate('followers')
        .populate('chats.receiverId')
        .populate('chats.msgId')
        .populate('notifications.sender')
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

exports.viewProfile = async (req, res) => {
    date = moment().format('YYYY-MM-DD')

    await User.updateOne({
        _id: req.body.id,
        'notifications.date': {
            $ne: [
                date, ''
            ]
        },
        'notifications.sender': {
            $ne: req.user._id
        }
    }, {
        $push: {
            notifications: {
                sender: req.user._id,
                message: req.user.username + ' viewed your Profile.',
                created: new Date(),
                date: date,
                viewProfile: true
            }
        }
    }).then(() => {
        return res.status(201).json({
            message: 'Notification sent.'
        })
    }).catch(() => {
        return res.status(422).json({
            message: 'Error occured.'
        })
    })
}

exports.changePassword = async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })

    bcrypt.compare(req.body.currentPassword, user.password).then(async (password) => {
        if (!password) {
            return res.status(404).json({
                message: 'Current password is incorrect.'
            })
        }

        const newPassword = await User.EncryptPassword(req.body.newPassword)
        await User.updateOne({
            _id: req.user._id
        }, {
            password: newPassword
        }).then(() => {
            return res.status(201).json({
                message: 'Password changed successfully.'
            })
        }).catch(() => {
            return res.status(422).json({
                message: 'Error occured.'
            })
        })
    })
}