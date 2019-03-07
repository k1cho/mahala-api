const User = require('../models/user')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dj7a0d88z',
    api_key: '225984538533363',
    api_secret: '14TrHwbq3N09XKqpq4rRJPp0H_M'
});

exports.uploadImage = (req, res, err) => {
    cloudinary.uploader.upload(req.body.image, async (result) => {
        console.log(result);
        await User.updateOne({
            _id: req.user._id
        }, {
            $push: {
                images: {
                    imgId: result.public_id,
                    imgVersion: result.version
                }
            }
        }).then(() => {
            return res.status(201).json({
                message: 'Image uploaded successfully.'
            })
        }).catch(() => {
            return res.status(422).json({
                error: 'Error occured.'
            })
        })

    })
}