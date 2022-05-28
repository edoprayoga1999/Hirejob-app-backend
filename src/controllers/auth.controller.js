const bcrypt = require('bcrypt')
const authModel = require('../models/auth.model')
const { success, failed } = require('../helpers/response')
const jwtToken = require('../helpers/generateJwtToken')
const authController = {
  register: (req, res) => {
    try {
      const { name, email, password, phone, level, company, occupation } = req.body
      if (!name) {
        throw Error('Name cant be empty') // validation
      }
      if (!email) {
        throw Error('Email cant be empty') // validation
      }
      if (!password) {
        throw Error('Password cant be empty') // validation
      }
      if (!phone) {
        throw Error('Phone cant be empty') // validation
      }
      authModel.checkEmailRegistered(email.toLowerCase()) // call model to check email exist or not
        .then((result) => {
          bcrypt.hash(password, 10, (err, hash) => { // encrypt password before insert to db
            if (err) {
              failed(res, {
                code: 500,
                status: 'failed',
                message: err.message,
                error: []
              }) // show error if catching error
            } else {
              const data = { // data to send
                email: email.toLowerCase(),
                password: hash,
                level
              }
              authModel.register(data) // calling model to register data
                .then(async (result) => {
                  const loginId = await authModel.getLoginId(data.email)
                  if (level === 0) {
                    authModel.inputUserData(loginId, name, phone)
                      .then((result) => {
                        success(res, {
                          code: 200,
                          status: 'success',
                          message: 'Register user success',
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
                  } else {
                    authModel.inputRecruiterData(loginId, name, company, occupation, phone)
                      .then((result) => {
                        success(res, {
                          code: 200,
                          status: 'success',
                          message: 'Register recruiter success',
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
                  }
                  // output if success
                })
                .catch((err) => {
                  failed(res, {
                    code: 500,
                    status: 'failed',
                    message: err.message,
                    error: []
                  }) // output if failed
                })
            }
          })
        })
        .catch((err) => {
          failed(res, {
            code: 500,
            status: 'failed',
            message: err.message,
            error: []
          }) // output if email already registered
        })
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: err.message,
        error: []
      }) // output if catching error
    }
  },
  login: (req, res) => {
    try {
      const { password } = req.body
      const email = req.body.email.toLowerCase()
      if (!email) {
        throw Error('Email must be filled')
      }
      if (!password) {
        throw Error('Password must be filled')
      }
      authModel.login(email)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Wrong email or password',
              error: []
            })
          } else {
            bcrypt.compare(password, result.rows[0].password)
              .then(async (match) => {
                if (match) {
                  const token = await jwtToken(result.rows[0])
                  success(res, {
                    code: 200,
                    status: 'success',
                    message: 'login successfull',
                    token,
                    data: { level: result.rows[0].level }
                  })
                } else {
                  failed(res, {
                    code: 500,
                    status: 'failed',
                    message: 'Wrong email or password',
                    error: []
                  })
                }
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
  },
  loginRecruiter: (req, res) => {
    try {
      const { password } = req.body
      const email = req.body.email.toLowerCase()
      if (!email) {
        throw Error('Email must be filled')
      }
      if (!password) {
        throw Error('Password must be filled')
      }
      authModel.loginRecruiter(email)
        .then((result) => {
          if (!result.rowCount) {
            failed(res, {
              code: 500,
              status: 'failed',
              message: 'Wrong email or password',
              error: []
            })
          } else {
            bcrypt.compare(password, result.rows[0].password)
              .then(async (match) => {
                if (match) {
                  const token = await jwtToken(result.rows[0])
                  success(res, {
                    code: 200,
                    status: 'success',
                    message: 'login successfull',
                    token,
                    data: { level: result.rows[0].level }
                  })
                } else {
                  failed(res, {
                    code: 500,
                    status: 'failed',
                    message: 'Wrong email or password',
                    error: []
                  })
                }
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
module.exports = authController
