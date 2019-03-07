const express = require('express')
const router = express.Router()

const ImagesController = require('../controllers/images')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/upload-image', AuthMiddleware.verifyToken, ImagesController.uploadImage)

module.exports = router