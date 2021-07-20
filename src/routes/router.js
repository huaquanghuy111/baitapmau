import express from 'express'

import bookController from '../controller/bookController'
import userController from '../controller/userController'
import projectController from '../controller/projectController'
import {} from 'express-async-errors'

const router = express.Router()

router.get('/projects', projectController.list)
router.get('/users', userController.list)
router.get('/list', bookController.detail)
router.get('/projects/projectName', projectController.findbyName)
router.post('/post', bookController.addBook)
router.post('/projects', projectController.addProject)
router.delete('/projects', projectController.removeProjects)
router.put('/projects', projectController.updateProject)

export default router
