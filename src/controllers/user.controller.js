/* eslint-disable camelcase */
const userModel = require('../models/user.model')
const skillModel = require('../models/skill.model')
const portofolioModel = require('../models/portofolio.model')
const experienceModel = require('../models/experience.model')
const { success, failed } = require('../helpers/response')
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const name = req.query.name || ''
      const type = req.query.type === 'DESC' ? 'DESC' : 'ASC'
      let field
      if (req.query.field === 'name' || req.query.field === 'location' || req.query.field === 'fulltime') {
        field = req.query.field
      } else {
        field = 'name'
      }
      const { page, limit } = req.query
      const getPage = page ? Number(page) : 1
      const limitPage = limit ? Number(limit) : 3
      const offset = (getPage - 1) * limitPage
      const allData = await userModel.getCountData(name, field, type)
      const totalData = Number(allData.rows[0].total)
      const totalPage = Math.ceil(totalData / limitPage)
      userModel.getAllUsers(name, field, type, limitPage, offset)
        .then(async (result) => {
          const pagination = { page: getPage, data_perPage: limitPage, total_data: totalData, total_page: totalPage }
          const data = await Promise.all(result.rows.map(async (item) => {
            const getSkill = await skillModel.getSkillById(item.id)
            const getPortofolio = await portofolioModel.getPortofolioById(item.id)
            const getExperience = await experienceModel.getExperienceById(item.id)
            const obj = {
              id: item.id,
              name: item.name,
              jobdesk: item.jobdesk,
              location: item.location,
              photo: item.photo,
              fulltime: item.fulltime,
              description: item.description,
              skill: getSkill.rows,
              portofolio: getPortofolio.rows,
              experience: getExperience.rows
            }
            return obj
          }))
          success(res, {
            code: 200,
            status: 'success',
            message: 'get all user success',
            data,
            pagination
          })
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
        error: err
      })
    }
  },
  updateUserData: (req, res) => {
    try {
      const { name, phone, jobdesk, fulltime, location, instagram, github, gitlab, company_name, description } = req.body
      const userId = req.APP_DATA.tokenDecoded.id
      if (!name) {
        throw Error('Name must be provided')
      }
      if (!phone) {
        throw Error('Phone must be provided')
      }
      if (typeof (fulltime) !== 'number' || (fulltime !== 0 && fulltime !== 1)) {
        throw Error('Fulltime must number and only 0 / 1')
      }
      const companyName = company_name
      userModel.updateUser(userId, name, phone, jobdesk, fulltime, location, instagram, github, gitlab, companyName, description)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'failed update user data (no user found)',
              err: []
            })
          } else {
            success(res, {
              code: 200,
              status: 'success',
              message: 'Update profile successfull',
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
  updatePhoto: (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id
      const photo = req.file.filename
      userModel.updatePhoto(userId, photo)
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
  getUserDetailById: (req, res) => {
    try {
      const { id } = req.params
      userModel.getUserDetailById(id)
        .then(async (result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed get data (User not found)',
              error: []
            })
          } else {
            const data = await Promise.all(result.rows.map(async (item) => {
              const getSkill = await skillModel.getSkillById(item.id)
              const getPortofolio = await portofolioModel.getPortofolioById(item.id)
              const getExperience = await experienceModel.getExperienceById(item.id)
              const obj = {
                id: item.id,
                name: item.name,
                jobdesk: item.jobdesk,
                location: item.location,
                photo: item.photo,
                fulltime: item.fulltime,
                description: item.description,
                email: item.email,
                instagram: item.instagram,
                github: item.github,
                gitlab: item.gitlab,
                phone: item.phone,
                company: item.company_name,
                skill: getSkill.rows,
                portofolio: getPortofolio.rows,
                experience: getExperience.rows
              }
              return obj
            }))
            success(res, {
              code: 200,
              status: 'success',
              message: 'Get data user successfull',
              data
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
      const userId = req.APP_DATA.tokenDecoded.id
      userModel.getUserDetailById(userId)
        .then(async (result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Failed get data (User not found)',
              error: []
            })
          } else {
            const data = await Promise.all(result.rows.map(async (item) => {
              const getSkill = await skillModel.getSkillById(item.id)
              const getPortofolio = await portofolioModel.getPortofolioById(item.id)
              const getExperience = await experienceModel.getExperienceById(item.id)
              const obj = {
                id: item.id,
                name: item.name,
                jobdesk: item.jobdesk,
                location: item.location,
                photo: item.photo,
                fulltime: item.fulltime,
                description: item.description,
                email: item.email,
                instagram: item.instagram,
                github: item.github,
                gitlab: item.gitlab,
                phone: item.phone,
                company: item.company_name,
                skill: getSkill.rows,
                portofolio: getPortofolio.rows,
                experience: getExperience.rows
              }
              return obj
            }))
            success(res, {
              code: 200,
              status: 'success',
              message: 'Get data user successfull',
              data
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
module.exports = userController
