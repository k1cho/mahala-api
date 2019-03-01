const express = require('express')
const router = express.Router()

const NotificationsController = require('../controllers/notifications')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/mark/:id', AuthMiddleware.verifyToken, NotificationsController.markAsRead)
router.post('/markAll', AuthMiddleware.verifyToken, NotificationsController.markAll)

module.exports = router