import express from 'express'
import usersController from '../controller/usersController'
import projectsController from '../controller/projectsController'
import {} from 'express-async-errors'
import auth from '../middleware/authMiddleware'
import {} from 'express-router-group'


const router = express.Router()
router.group('/protect', auth, router => {
  router.get('/projects', projectsController.index)
  router.get('/projects/:id', projectsController.show)
  router.post('/projects', projectsController.store)
  router.delete('/projects/:id', projectsController.delete)
  router.put('/projects/:id', projectsController.update)

  router.get('/users', usersController.index)
  router.get('/users/:id', usersController.show)
  router.post('/users', usersController.store)
  router.delete('/users/:id', usersController.delete)
  router.put('/users/:id', usersController.update)
})

router.post('/register', usersController.register)
router.post('/login', usersController.signIn)
router.get('/home', usersController.authenticate)

router.group("/private",auth, router => {
  router.post('/welcome', (req, res) => res.status(200).send('welcome')) 
})

router.get('/', usersController.home)

export default router
