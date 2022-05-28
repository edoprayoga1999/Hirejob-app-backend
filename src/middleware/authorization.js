const { failed } = require('../helpers/response')

module.exports = {
  isPekerja: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next()
    } else {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'forbidden access',
        error: []
      })
    }
  },
  isCompany: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next()
    } else {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'forbidden access',
        error: []
      })
    }
  }
}
