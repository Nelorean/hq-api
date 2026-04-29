const express = require('express')
const router = express.Router()
const {regist,login} = require('../controllers/authController')

router.post('/regist',register)
router.post('/login',login)

module.exports = router;