const db = require('../config/db')
const experienceModel = {
  getExperienceById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, photo, position, company_name, start_date, end_date, description FROM experience WHERE user_id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  addExperience: (userId, photo, position, companyName, startDate, endDate, description) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO experience (user_id, photo, position, company_name, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)', [userId, photo, position, companyName, startDate, endDate, description], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(reject)
        }
      })
    })
  },
  deleteExperience: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM experience WHERE id=$1 AND user_id=$2', [id, userId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = experienceModel
