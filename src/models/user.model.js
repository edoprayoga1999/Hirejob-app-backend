const db = require('../config/db')
const userModel = {
  getCountData: (name, field, type) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) as total FROM users WHERE LOWER(name) LIKE LOWER('%${name}%') ORDER BY ${field} ${type}`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getAllUsers: (name, field, type, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, name, jobdesk, location, photo, fulltime FROM users WHERE LOWER(name) LIKE LOWER('%${name}%') ORDER BY ${field} ${type} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateUser: (id, name, phone, jobDesk, fullTime, location, instagram, github, gitlab, companyName, description) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$2, phone=$3, jobdesk=$4, fulltime=$5, location=$6, instagram=$7, github=$8, gitlab=$9, company_name=$10, description=$11 WHERE id=$1', [id, name, phone, jobDesk, fullTime, location, instagram, github, gitlab, companyName, description], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updatePhoto: (id, photo) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET photo=$2 WHERE id=$1', [id, photo], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getUserDetailById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT users.id, name, phone, jobdesk, location, fulltime, description, email, instagram, github, gitlab, photo, company_name FROM users INNER JOIN login ON users.login_id=login.id WHERE users.id = $1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = userModel
