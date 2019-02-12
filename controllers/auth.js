const User = require('../models/user')
const Helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')

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

    bcrypt.hash(req.body.password, 10).then((result) => {
        const user = new User({
            username: Helpers.firstUppercase(req.body.username),
            email: Helpers.lowerCase(req.body.email),
            password: result
        })

        user.save((err) => {
            if (err) {
                return res.status(422).send({
                    message: err.message
                })
            }
            return res.status(201).json({
                message: 'Successfully registered.'
            })
        })
    })
}