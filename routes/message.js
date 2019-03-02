const express = require('express')
const router = express.Router()

const MessagesController = require('../controllers/messages')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.post('/chat/:senderId/:receiverId', AuthMiddleware.verifyToken, MessagesController.store)

module.exports = router