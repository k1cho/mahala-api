const express = require('express')
const router = express.Router()

const PostsController = require('../controllers/posts')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('', AuthMiddleware.verifyToken, PostsController.index)
router.post('/store', AuthMiddleware.verifyToken, PostsController.store)

module.exports = router