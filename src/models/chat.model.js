const db = require('../config/db')
const chatModel = {
  getChatToUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT hirejob.recruiter.name, hirejob.recruiter.photo, message FROM hirejob.chat INNER JOIN hirejob.recruiter ON hirejob.chat.from_company_id=hirejob.recruiter.id WHERE to_user_id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  insertMessage: (recruiterId, userId, message) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hirejob.chat (from_company_id, to_user_id, message) VALUES ($1, $2, $3)', [recruiterId, userId, message], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  landingInfo: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hirejob.landing WHERE id=1', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = chatModel
