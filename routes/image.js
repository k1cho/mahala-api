const express = require('express')
const router = express.Router()

const ImagesController = require('../controllers/images')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/upload-image', AuthMiddleware.verifyToken, ImagesController.uploadImage)
router.get('/set-profile-image/:imgId/:imgVersion', AuthMiddleware.verifyToken, ImagesController.setProfilePic)

module.exports = router