const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('', AuthMiddleware.verifyToken, UsersController.index)

module.exports = router