const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MONGO_URI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected...')
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

module.exports = connectDB
