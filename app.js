const express = require('express')
const color = require('colors')
const dotenv = require('dotenv')
const tasks = require('./routes/tasks')
const connectDB = require('./config/db')
const notFound = require('./middlewares/notFound')
const asyncHandler = require('./middlewares/ayncHandler')

// load env variable
dotenv.config({path:'config/config.env'})

// connect Database
connectDB()

const app = express()

// middleware
app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/api/v1/tasks', tasks)
app.use(asyncHandler)
app.use(notFound)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () =>{
    console.log(`Server Listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
})

process.on('unhandledRejection', (err)=>{
    console.error(err.message)
    server.close(() => process.exit(1))
})