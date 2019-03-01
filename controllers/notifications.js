const User = require('../models/user')

exports.markAsRead = async (req, res, err) => {
    if (!req.body.deleteValue) {
        await User.updateOne({
            _id: req.user._id,
            'notifications._id': req.params.id
        }, {
            $set: {
                'notifications.$.read': true
            }
        }).then(() => {
            return res.status(201).json({
                message: 'Marked as read.'
            })
        }).catch(err => {
            return res.status(422).json({
                message: 'Something went wrong',
                error: err
            })
        })
    } else {
        await User.updateOne({
            _id: req.user._id,
            'notifications._id': req.params.id
        }, {
            $pull: {
                notifications: {
                    _id: req.params.id
                }
            }
        }).then(() => {
            return res.status(201).json({
                message: 'Notification deleted.'
            })
        }).catch(err => {
            return res.status(422).json({
                message: 'Something went wrong',
                error: err
            })
        })
    }
}

exports.markAll = async (req, res) => {
    await User.update({
        _id: req.user._id
    }, {
        $set: {
            'notifications.$[elem].read': true
        }
    }, {
        arrayFilters: [{
            'elem.read': false
        }],
        multi: true
    }).then(() => {
        return res.status(201).json({
            message: 'Marked all as read.'
        })
    }).catch(err => {
        return res.status(422).json({
            message: 'Something went wrong',
            error: err
        })
    })
}