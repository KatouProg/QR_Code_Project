//imports
const express            = require('express');
const app                = express();
const path               = require('path')
const cors               = require('cors')

//routes
const userInfoRoutes = require('./routes/userInfo')

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/userInfo', userInfoRoutes)


module.exports = app;