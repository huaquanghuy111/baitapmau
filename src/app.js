import express from 'express'
import {} from 'dotenv/config'
import bodyParser from 'body-parser'
import session from 'express-session'
import router from './routes/router'
import oauthRouter from './routes/oauthRouter'
import db from './models'

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
//db.sequelize.sync()
app.use(session({ secret: process.env.SCRETKEY }))
app.use(oauthRouter)
app.use(router)

//Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found!!!')
  error.status = 404
  next(error)
})
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500)
  res.json({
    err: {
      status: err.status,
      message: err.message,
    },
  })
})

app.listen(port, () => console.log(`server is running on ${port}`))
