const { Router } = require('express')
const auth = require('../../middleware/auth')
const authController = require('../../controllers/authController')
const { loginUser } = require('../../utils/validator')
const router = Router()

//@route GET /api/auth
//@description Auth route
//@access Public
router.get('/', auth, authController.auth)

//@route POST /api/auth
//@description Authenticate user and get token
//@access Public
router.post('/', loginUser, authController.login)

module.exports = router
