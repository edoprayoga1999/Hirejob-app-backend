const express = require('express')
const router = express.Router()
const { updateRecruiterData, updatePhoto, getRecruiterDetailById, getMyProfile } = require('../controllers/recruiter.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isCompany } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router
  .put('/recruiter/update', jwtAuth, isCompany, updateRecruiterData)
  .put('/recruiter/update/photo', jwtAuth, isCompany, upload, updatePhoto)
  .get('/recruiter/myprofile', jwtAuth, isCompany, getMyProfile)
  .get('/recruiter/:id', jwtAuth, getRecruiterDetailById)
module.exports = router
