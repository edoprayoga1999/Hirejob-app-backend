const express = require('express')
const router = express.Router()
const { addPortofolio, deletePortofolio } = require('../controllers/portofolio.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isPekerja } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router
  .post('/portofolio/add', jwtAuth, isPekerja, upload, addPortofolio)
  .delete('/portofolio/delete/:portoId', jwtAuth, isPekerja, deletePortofolio)

module.exports = router
