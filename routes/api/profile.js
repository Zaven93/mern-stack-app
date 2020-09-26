const { Router } = require('express')
const { createProfileValidator } = require('../../utils/validator')
const { experienceValidator, educationValidator } = require('../../utils/validator')
const auth = require('../../middleware/auth')
const profileController = require('../../controllers/profileController')
const router = Router()

//@route GET /api/profile/me
//@description Get current user profile
//@access Private
router.get('/me', auth, profileController.getProfile)

//@route POST /api/profile
//@description Create or update user profile
//@access Private
router.post('/', auth, createProfileValidator, profileController.createProfile)

//@route GET /api/profile
//@description Get all profiles
//@access Public
router.get('/', profileController.getAllProfiles)

//@route GET /api/profile/user/:user_id
//@description Get user profile by user Id
//@access Public
router.get('/user/:user_id', profileController.getProfileById)

//@route DELETE /api/profile
//@description Delete user and profile
//@access Private
router.delete('/', auth, profileController.deleteProfile)

//@route PUT /api/profile/experience
//@description Adding experience
//@access Private
router.put('/experience', auth, experienceValidator, profileController.addExperience)

//@route DELETE /api/profile/experience/:experience_id
//@description Deleting experience
//@access Private
router.delete('/experience/:experience_id', auth, profileController.removeExperience)

//@route PUT /api/profile/education
//@description Adding education
//@access Private
router.put('/education', auth, educationValidator, profileController.addEducation)

//@route DELETE /api/profile/education/:education_id
//@description Deleting education
//@access Private
router.delete('/education/:education_id', auth, profileController.removeEducation)

//@route GET /api/profile/github/:username
//@description Get user repos from Github
//@access Public
router.get('/github/:username', profileController.getGithubUser)

module.exports = router
