import express from 'express'

import bookController from '../controller/booksController'
import usersController from '../controller/usersController'
import projectsController from '../controller/projectsController'
import {} from 'express-async-errors'
import auth from '../middleware/auth'

const router = express.Router()
router.get('/params/:p', (req, res) => {
  const params = req.params.p
  res.send(`params in url is ${params}`)
})
router.post('/welcome', auth, (req, res) => {
  console.log()
  res.status(200).send('welcome')
})
router.get('/search', (req, res) => res.json(req.query))

router.get('/projects', projectsController.index)
router.get('/projects/:id', projectsController.show)
router.post('/projects', projectsController.store)
router.delete('/projects/:id', projectsController.delete)
router.put('/projects/:id', projectsController.update)

router.get('/users', usersController.index)
router.get('/users/:id', usersController.show)
router.post('/users', usersController.store)
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.sign_in)
router.delete('/users/:id', usersController.delete)
router.put('/users/:id', usersController.update)

router.post('/post', bookController.addBook)
router.get('/list', bookController.detail)

export default router
