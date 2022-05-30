const express = require('express')
const router = express.Router()
const { getMessage, addMessage } = require('../controllers/chat.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isPekerja, isCompany } = require('../middleware/authorization')

router
  .get('/chat', jwtAuth, isPekerja, getMessage)
  .post('/chat/add', jwtAuth, isCompany, addMessage)

module.exports = router
