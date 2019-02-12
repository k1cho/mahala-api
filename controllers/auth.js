const User = require('../models/user')
const Helpers = require('../helpers/helpers')

exports.register = async (req, res) => {
    const email = await User.findOne({
        email: Helpers.lowerCase(req.body.email)
    })

    if (email) {
        return res.status(409).json({
            message: 'Email already exists.'
        })
    }

    const username = await User.findOne({
        username: Helpers.firstUppercase(req.body.username)
    })

    if (username) {
        return res.status(409).json({
            message: 'Username already exists.'
        })
    }
}