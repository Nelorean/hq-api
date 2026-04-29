require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/authRutes')
const employeeRoutes = require('./routes/employeeRouts')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/employees',employeeRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB conectado!'))
  .catch((error)=>console.error('Erro ao conectar:',error))

module.exports = app;