const User = require('../models/user')
const Helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dbConfig = require('../config/secret')

exports.register = async (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(422).send({
            message: 'Please provide Username, Email and Password.'
        })
    }

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

    if (req.body.password !== req.body.passwordConfirm) {
        return res.status(422).send({
            message: 'Password and password confirmation do not match.'
        })
    }

    bcrypt.hash(req.body.password, 10).then((result) => {
        const user = {
            username: Helpers.firstUppercase(req.body.username),
            email: Helpers.lowerCase(req.body.email),
            password: result
        }

        User.create(user).then(user => {
            const token = jwt.sign({
                data: user
            }, dbConfig.secret, {
                expiresIn: '24h'
            })
            res.cookie('auth', token)

            return res.status(201).json({
                message: 'User created successfully.',
                user,
                token
            })
        }).catch(err => {
            return res.status(422).json({
                message: 'Error occured.'
            })
        })
    })
}