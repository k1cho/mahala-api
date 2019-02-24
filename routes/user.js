const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('', AuthMiddleware.verifyToken, UsersController.index)
router.get('/:id', AuthMiddleware.verifyToken, UsersController.show)

module.exports = router