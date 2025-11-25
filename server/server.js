require('dotenv').config()
const { connectDB } = require('./src/config/db')
const app = require('./src/app')

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    console.log('About to call connectDB...')
    await connectDB()
    console.log('Database connected successfully')
  } catch (err) {
    console.warn('Database connection failed, starting server without DB:', err.message || err)
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start()