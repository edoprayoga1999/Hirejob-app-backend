const db = require('../config/db')
const skillModel = {
  getSkillById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, name FROM hirejob.skill WHERE user_id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  insertSkill: (userId, skillName) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO hirejob.skill (user_id, name) VALUES ($1, $2)', [userId, skillName], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteSkill: (userId, skillId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM hirejob.skill WHERE id=$2 AND user_id=$1', [userId, skillId], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  checkSkillRegistered: (skillName, userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) FROM hirejob.skill WHERE LOWER(name)=$1 AND user_id=$2', [skillName, userId], (err, result) => {
        if (err) {
          reject(err)
        } else if (result.rows[0].count > 0) {
          reject(new Error('You have added this skill before'))
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = skillModel
