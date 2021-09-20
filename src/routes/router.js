import express from 'express'
import usersController from '../controller/usersController'
import projectsController from '../controller/projectsController'
import User2Controller from '../controller/users2Controller'
import {} from 'express-async-errors'
import auth from '../middleware/authMiddleware'
import {} from 'express-router-group'
import projects2Controller from '../controller/project2Controller'
import errorsController from '../controller/errorsController'

const router = express.Router()
router.group('/protect', auth, (router) => {
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
router.get('/fail?from=facebook', errorsController.failFacebook)
router.get('/fail?from=google', errorsController.failGoogle)
router.post('/register', usersController.register)
router.post('/login', usersController.signIn)
router.get('/home', usersController.authenticate)

router.group('/private', auth, (router) => {
  router.post('/welcome', (req, res) => res.status(200).send('welcome'))
})

router.get('/', usersController.home)
router.get('/users', User2Controller.index)
router.get('/users/:id', User2Controller.show)
router.put('/users/:id',User2Controller.update)
router.delete('/users/:id', User2Controller.delete)
router.post('/users/register', User2Controller.register)
router.post('/users/login', User2Controller.logIn)

router.get('/projects', projects2Controller.index)
router.get('/projects/:id', projects2Controller.showbyUserId)
router.get('/project/all', User2Controller.showAllProjectbyUserId)

//mail


export default router
