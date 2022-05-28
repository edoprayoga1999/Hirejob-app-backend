const express = require('express')
const router = express.Router()
const { getAllUsers, updateUserData, updatePhoto, getUserDetailById, getMyProfile } = require('../controllers/user.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isPekerja } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router
  .get('/allusers', jwtAuth, getAllUsers)
  .put('/user/update', jwtAuth, isPekerja, updateUserData)
  .put('/user/update/photo', jwtAuth, isPekerja, upload, updatePhoto)
  .get('/user/:id', jwtAuth, getUserDetailById)
  .get('/myprofile', jwtAuth, getMyProfile)

module.exports = router
