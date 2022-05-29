require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')

const authRoute = require('./src/router/auth.route')
const userRoute = require('./src/router/user.route')
const skillRoute = require('./src/router/skill.route')
const portofolioRoute = require('./src/router/portofolio.route')
const experienceRoute = require('./src/router/experience.route')
const recruiterRoute = require('./src/router/recruiter.route')

const app = express()
app.use(cors())
app.use(helmet({
  crossOriginResourcePolicy: false
}))
app.use(xss())
app.use(bodyParser.json())

app.use(authRoute)
app.use(userRoute)
app.use(skillRoute)
app.use(portofolioRoute)
app.use(experienceRoute)
app.use(recruiterRoute)

app.use(express.static('public'))

const APP_PORT = process.env.PORT || 4000
app.listen(APP_PORT, () => {
  console.log(`Service running on port ${APP_PORT}`)
})
