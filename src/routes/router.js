import express from 'express'
import bookController from '../controller/bookController'
import userController from '../controller/userController'
import projectController from '../controller/projectController'

const router = express.Router()
router.get('/projects', projectController.getAll)
router.get('/users', userController.getAll)
router.get('/', bookController.detail)
router.post('/post', bookController.addBook)

export default router
