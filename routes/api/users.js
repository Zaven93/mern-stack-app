const { Router } = require('express')
const userController = require('../../controllers/userController')
const { registerUser } = require('../../utils/validator')
const router = Router()

//@route POST api/users
//@desc Register user
//@access Public
router.post('/', registerUser, userController.registerUser)

module.exports = router
