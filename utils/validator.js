const { check } = require('express-validator')

exports.registerUser = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please fill in a correct email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
]

exports.loginUser = [
    check('email', 'Please fill in a correct email').isEmail(),
    check('password', 'Password is required').exists()
]

exports.createProfileValidator = [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]

exports.experienceValidator = [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]

exports.educationValidator = [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]

exports.postValidator = [check('text', 'Text is required').not().isEmpty()]

exports.commentValidator = [check('text', 'Text is required').not().isEmpty()]
