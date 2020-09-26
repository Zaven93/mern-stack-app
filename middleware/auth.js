const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  //Getting a token from header
  const token = req.header('x-auth-token')

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' })
  }

  //Verifying token
  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'))
    req.user = decoded.user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}
