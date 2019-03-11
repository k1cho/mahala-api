const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')
const AuthMiddleware = require('../middlewares/authMiddleware')

router.get('', AuthMiddleware.verifyToken, UsersController.index)
router.get('/id/:id', AuthMiddleware.verifyToken, UsersController.show)
router.get('/username/:username', AuthMiddleware.verifyToken, UsersController.getUserByUsername)
router.post('/view-profile', AuthMiddleware.verifyToken, UsersController.viewProfile)

module.exports = router