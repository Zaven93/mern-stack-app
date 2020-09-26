const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const imageUpload = require('./utils/imageUpload')
const app = express()
//Routes
const authRoute = require('./routes/api/auth')
const postsRoute = require('./routes/api/posts')
const profileRoute = require('./routes/api/profile')
const usersRoute = require('./routes/api/users')

connectDB()

app.use(express.json({ extended: false }))
app.use(express.static(path.join(__dirname, 'images')))
app.use(imageUpload.single('avatar'))

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/profile', profileRoute)
app.use('/api/users', usersRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
