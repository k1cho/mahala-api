const express = require('express')
const router = express.Router()

const NotificationsController = require('../controllers/notifications')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/mark/:id', AuthMiddleware.verifyToken, NotificationsController.markAsRead)

module.exports = router