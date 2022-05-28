const express = require('express')
const router = express.Router()
const { register, login, loginRecruiter } = require('../controllers/auth.controller')
router
  .post('/register', register) // For register user
  .post('/login', login) // For login user
  .post('/login/recruiter', loginRecruiter)
module.exports = router
