const express = require('express')
const router = express.Router()

const CommentsController = require('../controllers/comments')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/store', AuthMiddleware.verifyToken, CommentsController.store)

module.exports = router