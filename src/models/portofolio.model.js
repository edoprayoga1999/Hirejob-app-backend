const db = require('../config/db')
const portofolioModel = {
  getPortofolioById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, photo, title, project_link, platform FROM hirejob.portofolio WHERE user_id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  insertPortofolio: (userId, photo, title, projectLink, platform) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO portofolio (user_id, photo, title, project_link, platform) VALUES ($1, $2, $3, $4, $5)', [userId, photo, title, projectLink, platform], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deletePortofolio: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM hirejob.portofolio WHERE id=$1 AND user_id=$2', [id, userId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = portofolioModel
