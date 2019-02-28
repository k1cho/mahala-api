const express = require('express')
const router = express.Router()

const NotificationsController = require('../controllers/notifications')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/mark/:id', AuthMiddleware.verifyToken, NotificationsController.markAsRead)
router.delete('/delete/:id', AuthMiddleware.verifyToken, NotificationsController.delete)

module.exports = router