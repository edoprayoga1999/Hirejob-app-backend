const db = require('../config/db')
const authModel = {
  checkEmailRegistered: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) FROM hirejob.login WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else if (result.rows[0].count > 0) {
          reject(new Error('Email already registered!'))
        } else {
          resolve(result)
        }
      })
    })
  },
  register: ({ email, password, level }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hirejob.login (email, password, level) VALUES ($1, $2, $3)', [email, password, level], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  inputUserData: (loginId, name, phone) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hirejob.users (name, phone, is_verified, login_id) VALUES ($1, $2, 1, $3)', [name, phone, loginId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  inputRecruiterData: (loginId, name, company, occupation, phone) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hirejob.recruiter (login_id, name, company, occupation, phone) VALUES ($1, $2, $3, $4, $5)', [loginId, name, company, occupation, phone], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getLoginId: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hirejob.login WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows[0].id)
        }
      })
    })
  },
  login: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT hirejob.users.id AS id, password, level FROM hirejob.login INNER JOIN hirejob.users on hirejob.login.id=hirejob.users.login_id WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  loginRecruiter: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT hirejob.recruiter.id AS id, password, level FROM hirejob.login INNER JOIN hirejob.recruiter on hirejob.login.id=hirejob.recruiter.login_id WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = authModel
