import express from 'express'
import bookController from '../controller/bookController'
import userController from '../controller/userController'
import projectController from '../controller/projectController'
import {} from 'express-async-errors'

const router = express.Router()

router.get('/projects', projectController.list)
router.get('/users', userController.list)
router.get('/list', bookController.detail)
router.post('/post', bookController.addBook)

export default router
