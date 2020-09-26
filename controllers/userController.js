const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = {
    registerUser: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ error: 'User with such an email already exists' })
            }

            let avatar = null

            if (req.file) {
                avatar = `/${req.file.filename}`
            } else {
                avatar = null
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            user = new User({
                name,
                email,
                password: hashedPassword,
                avatar
            })

            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.json({ token })
            })
        } catch (error) {
            console.log(error)
        }
    }
}
