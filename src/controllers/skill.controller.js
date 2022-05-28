const skillModel = require('../models/skill.model')
const { success, failed } = require('../helpers/response')

const skillController = {
  addSkill: (req, res) => {
    try {
      const { name } = req.body
      const userId = req.APP_DATA.tokenDecoded.id
      if (!name) {
        throw Error('Skill name must be provided')
      }
      name.map(async (item) => await skillModel.insertSkill(userId, item))
      success(res, {
        code: 200,
        status: 'success',
        message: 'Sukses menambahkan skill'
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
  deleteSkill: (req, res) => {
    try {
      const { skillId } = req.params
      const userId = req.APP_DATA.tokenDecoded.id
      skillModel.deleteSkill(userId, skillId)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Delete skill unsuccessfull (Skill not found)',
              error: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Skill deleted successfully',
              error: []
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
        status: 'failed',
        message: err.message,
        error: []
      })
    }
  }
}

module.exports = skillController
