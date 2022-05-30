/* eslint-disable camelcase */
const recruiterModel = require('../models/recruiter.model')
const { success, failed } = require('../helpers/response')
const recruiterController = {
  updateRecruiterData: (req, res) => {
    try {
      const { name, company, occupation, phone, city, bio, instagram, linkedin, email, loginId } = req.body
      const recruiterId = req.APP_DATA.tokenDecoded.id
      if (!name) {
        throw Error('Name must be provided')
      }
      if (!phone) {
        throw Error('Phone must be provided')
      }
      recruiterModel.updateRecruiter(recruiterId, name, company, occupation, phone, city, bio, instagram, linkedin)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'failed update recruiter data (no user found)',
              err: []
            })
          } else {
            recruiterModel.updateEmail(loginId, email)
              .then(() => {
                success(res, {
                  code: 200,
                  status: 'success',
                  message: 'Update profile successfull',
                  data: []
                })
              })
              .catch((err) => {
                failed(res, {
                  code: 500,
                  status: 'failed',
                  message: err.message,
                  error: err
                })
              })
          }
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: 'failed',
            message: 'bad request',
            error: err
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'bad request',
        error: err.message
      })
    }
  },
  updatePhoto: (req, res) => {
    try {
      const recruiterId = req.APP_DATA.tokenDecoded.id
      const photo = req.file.filename
      recruiterModel.updatePhoto(recruiterId, photo)
        .then((result) => {
          if (!result.rows) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed update photo',
              error: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Update photo successfull',
              data: []
            })
          }
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: 'failed',
            message: 'bad request',
            error: err
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'bad request',
        error: err.message
      })
    }
  },
  getRecruiterDetailById: (req, res) => {
    try {
      const { id } = req.params
      recruiterModel.getRecruiterDetailById(id)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed get data (User not found)',
              error: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Get data user successfull',
              data: result.rows
            })
          }
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'bad request',
        error: err.message
      })
    }
  },
  getMyProfile: (req, res) => {
    try {
      const recruiterId = req.APP_DATA.tokenDecoded.id
      recruiterModel.getRecruiterDetailById(recruiterId)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed get data (User not found)',
              error: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Get data user successfull',
              data: result.rows
            })
          }
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'bad request',
        error: err.message
      })
    }
  }
}
module.exports = recruiterController
