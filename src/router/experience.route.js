const express = require('express')
const router = express.Router()
const { addExperience, deleteExperience } = require('../controllers/experience.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isPekerja } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router
  .post('/experience/add', jwtAuth, isPekerja, upload, addExperience)
  .delete('/experience/delete/:expId', jwtAuth, isPekerja, deleteExperience)

module.exports = router
