const express = require('express')
const router = express.Router()

const MessagesController = require('../controllers/messages')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('/chat/:senderId/:receiverId', AuthMiddleware.verifyToken, MessagesController.getAll)
router.post('/chat/:senderId/:receiverId', AuthMiddleware.verifyToken, MessagesController.store)

module.exports = router