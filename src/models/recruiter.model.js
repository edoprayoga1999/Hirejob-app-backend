const db = require('../config/db')
const recruiterModel = {
  updateRecruiter: (id, name, company, occupation, phone, city, bio, instagram, linkedin) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recruiter SET name=$2, company=$3, occupation=$4, phone=$5, city=$6, bio=$7, instagram=$8, linkedin=$9 WHERE id=$1', [id, name, company, occupation, phone, city, bio, instagram, linkedin], (err, result) => {
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
      db.query('UPDATE recruiter SET photo=$2 WHERE id=$1', [id, photo], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getRecruiterDetailById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT recruiter.id, login_id, name, email, company, occupation, phone, city, bio, instagram, linkedin, photo FROM hirejob.recruiter INNER JOIN login ON recruiter.login_id=login.id WHERE recruiter.id = $1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateEmail: (id, email) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE login SET email=$2 WHERE id=$1', [id, email], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = recruiterModel
