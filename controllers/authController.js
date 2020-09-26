const { validationResult } = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
  auth: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).send('Server error')
    }
  },

  login: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        res.status(400).json({ message: 'Invalid credentials' })
      }

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
      res.status(500).send('Server error')
    }
  }
}
