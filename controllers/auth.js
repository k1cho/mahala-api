const joi = require('joi')

exports.register = (req, res) => {
    const schema = joi.object().keys({
        username: joi.string().min(4).max(32).required(),
        email: joi.string().email().min(4).max(32).required(),
        password: joi.string().min(4).max(32).required()
    })

    const {
        error,
        value
    } = joi.validate(req.body, schema)

    if (error && error.details) {
        return res.status(422).json({
            message: error.details
        })
    }
}