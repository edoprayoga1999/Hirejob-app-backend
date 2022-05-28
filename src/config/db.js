require('dotenv').config()
const { Pool } = require('pg')
const db = new Pool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})
db.connect((err) => {
  if (err) {
    console.log(err)
  }
})
module.exports = db
