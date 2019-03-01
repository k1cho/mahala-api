const express = require('express')
const router = express.Router()

const PostsController = require('../controllers/posts')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('', AuthMiddleware.verifyToken, PostsController.index)
router.get('/:id', AuthMiddleware.verifyToken, PostsController.findById)
router.get('/stream/topPosts', AuthMiddleware.verifyToken, PostsController.topPosts)
router.post('/store', AuthMiddleware.verifyToken, PostsController.store)
router.post('/like', AuthMiddleware.verifyToken, PostsController.like)

module.exports = router