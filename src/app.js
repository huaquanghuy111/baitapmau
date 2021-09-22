import bodyParser from 'body-parser'
import { } from 'dotenv/config'
import express from 'express'
import session from 'express-session'
import http from 'http'
import { Server } from 'socket.io'
import oauthRouter from './routes/oauthRouter'
import router from './routes/router'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
//db.sequelize.sync()
// app.use(session({ secret: process.env.SCRETKEY }))
app.use(oauthRouter)
app.use(router)
// socket io
//io.on server is execute catch a connection from client/browser
app.get('/', (req,res) => {
  res.sendFile('E://CompleteServer/index.html')

})
io.on('connection', (socket) => {
  console.log('client connected...')
  // socket.on('chat message', msg => {
  //   io.emit('chat message', msg);
  // });
});
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
  next()
})

// app.listen(port, () => console.log(`server is running on ${port}`))
server.listen(port, () => console.log(`server is running on ${port}`))
