/* eslint-disable camelcase */
const chatModel = require('../models/chat.model')
const recruiterModel = require('../models/recruiter.model')
const { success, failed } = require('../helpers/response')

const chatController = {
  addMessage: async (req, res) => {
    try {
      const { user_id } = req.body
      const recruiterId = req.APP_DATA.tokenDecoded.id
      if (!user_id) {
        throw Error('User ID harus diisi')
      }
      const companyData = await recruiterModel.getRecruiterDetailById(recruiterId)
      const message = `Halo, saya tertarik melihat profilmu dan ingin menghire kamu sebagai Web Developer di perusahaan kami. silahkan contact kami melalui email: ${companyData.rows[0].email} dan nomor telepon kami di ${companyData.rows[0].phone}`
      chatModel.insertMessage(recruiterId, user_id, message)
        .then(() => {
          success(res, {
            code: 200,
            status: 'success',
            message: 'Pesan hiring anda berhasil dikirim ke user',
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
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: []
      })
    }
  },
  getMessage: (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id
      chatModel.getChatToUser(userId)
        .then((result) => {
          success(res, {
            code: 200,
            status: 'success',
            message: 'Get message success',
            data: result.rows
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
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: err
      })
    }
  }
}
module.exports = chatController
