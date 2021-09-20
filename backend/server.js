const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const connectDB = require('./config/db')
const usersRoutes = require('./routes/usersRoutes')
const noteRoutes = require('./routes/noteRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

// User Routes
app.use('/api/users', usersRoutes)
app.use('/api/notes', noteRoutes)

// --------------------------deployment------------------------------
__dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running..')
  })
}
// --------------------------deployment------------------------------

// Middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(colors.bold.yellow(`${process.env.NODE_ENV} At http://localhost:${port}`))
})
