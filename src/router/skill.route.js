const express = require('express')
const router = express.Router()
const { addSkill, deleteSkill } = require('../controllers/skill.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isPekerja } = require('../middleware/authorization')

router
  .post('/skill/add', jwtAuth, isPekerja, addSkill)
  .delete('/skill/delete/:skillId', jwtAuth, isPekerja, deleteSkill)

module.exports = router
