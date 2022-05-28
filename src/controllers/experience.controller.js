/* eslint-disable camelcase */
const experienceModel = require('../models/experience.model')
const { success, failed } = require('../helpers/response')

const experienceController = {
  addExperience: (req, res) => {
    try {
      const { position, company_name, start_date, end_date, description } = req.body
      const photo = req.file.filename
      const userId = req.APP_DATA.tokenDecoded.id
      if (!position || !company_name || !start_date || !end_date || !description) {
        throw Error('All data must be provided')
      }
      experienceModel.addExperience(userId, photo, position, company_name, start_date, end_date, description)
        .then((result) => {
          success(res, {
            code: 200,
            status: 'success',
            message: 'Add experience success',
            data: []
          })
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: 'failed',
            message: err.message,
            error: []
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: []
      })
    }
  },
  deleteExperience: (req, res) => {
    try {
      const { expId } = req.params
      const userId = req.APP_DATA.tokenDecoded.id
      if (!expId) {
        throw Error('Experience id must be provided (hint: /experience/delete/{yourExperienceId})')
      }
      experienceModel.deleteExperience(expId, userId)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed when deleting experience (Experience not found)',
              error: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Delete experience success'
            })
          }
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: 'failed',
            message: err.message,
            error: []
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: []
      })
    }
  }
}
module.exports = experienceController
