const express = require('express')
const router = express.Router()

const MessagesController = require('../controllers/messages')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('/chat/:senderId/:receiverId', AuthMiddleware.verifyToken, MessagesController.getAll)
router.get('/mark-message/:sender/:receiver', AuthMiddleware.verifyToken, MessagesController.markReceiverMessage)
router.get('/mark-all-messages', AuthMiddleware.verifyToken, MessagesController.markAll)
router.post('/chat/:senderId/:receiverId', AuthMiddleware.verifyToken, MessagesController.store)

module.exports = router