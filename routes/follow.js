const express = require('express')
const router = express.Router()

const FollowsController = require('../controllers/follows')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/follow', AuthMiddleware.verifyToken, FollowsController.follow)
router.delete('/unfollow', AuthMiddleware.verifyToken, FollowsController.unfollow)

router.get('/followers', AuthMiddleware.verifyToken, FollowsController.followers)
router.get('/following', AuthMiddleware.verifyToken, FollowsController.following)

module.exports = router