const express = require('express')
const router = express.Router()
const { updateRecruiterData, updatePhoto, getRecruiterDetailById, getMyProfile } = require('../controllers/recruiter.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isCompany } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router
  .put('/recruiter/update', jwtAuth, isCompany, updateRecruiterData)
  .put('/recruiter/update/photo', jwtAuth, isCompany, upload, updatePhoto)
  .get('/recruiter/:id', jwtAuth, getRecruiterDetailById)
  .get('/recruiter/myprofile', jwtAuth, isCompany, getMyProfile)
module.exports = router
