/* eslint-disable camelcase */
const portofolioModel = require('../models/portofolio.model')
const { success, failed } = require('../helpers/response')

const portofolioController = {
  addPortofolio: (req, res) => {
    try {
      const { title, project_link, platform } = req.body
      const photo = req.file.filename
      const userId = req.APP_DATA.tokenDecoded.id
      if (!title || !project_link || !platform) {
        throw Error('All data must be provided')
      }
      portofolioModel.insertPortofolio(userId, photo, title, project_link, platform)
        .then((result) => {
          success(res, {
            code: 200,
            status: 'success',
            message: 'Add portofolio success',
            data: []
          })
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: 'error',
            message: err.message,
            error: []
          })
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: err.message,
        error: []
      })
    }
  },
  deletePortofolio: (req, res) => {
    try {
      const { portoId } = req.params
      const userId = req.APP_DATA.tokenDecoded.id
      if (!portoId) {
        throw Error('Portofolio id must be provided (hint: /portofolio/delete/{hereYourPortoId})')
      }
      portofolioModel.deletePortofolio(portoId, userId)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed when delete portofolio (Portofolio not found)',
              error: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Delete portofolio success'
            })
          }
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: err.message,
        error: []
      })
    }
  }
}
module.exports = portofolioController
