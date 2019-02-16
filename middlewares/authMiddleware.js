const jwt = require('jsonwebtoken')
const dbConfig = require('../config/secret')

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.auth || req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(403).json({
            message: 'Access forbidden!'
        })
    }

    return jwt.verify(token, dbConfig.secret, (err, decoded) => {
        if (err) {
            if (err.expiredAt < new Date()) {
                return res.status(422).json({
                    message: 'Token expired.',
                    token: null
                })
            }
            next()
        }
        req.user = decoded.data
        next()
    })
}