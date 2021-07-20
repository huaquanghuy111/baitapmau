import express from 'express'
import {} from 'dotenv/config'
import bodyParser from 'body-parser'
import path from 'path'
import router from './routes/router'


const __dirname = path.resolve()
const app = express()
app.use(express.static(`${__dirname}/dist`))

const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)
//Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found!!!')
  error.status = 404
  next(error)
})

  

app.use((err, req, res, next) => {
 res.status(err.status || 500)
 res.json({
   err: {
     message : err.message
   }
 })
})

app.listen(port, () => console.log(`server is running on ${port}`))
