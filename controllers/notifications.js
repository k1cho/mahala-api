const User = require('../models/user')

exports.markAsRead = async (req, res, err) => {
    if (!req.body.deleteVal) {
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
    }
}

exports.delete = (req, res, err) => {
    console.log(req.body);

}