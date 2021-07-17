import express from 'express'
import bookController from '../controller/bookController'
import userController from '../controller/userController'
import projectController from '../controller/projectController'

const router = express.Router()

const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}
router.get('/projects', use(projectController.list))
router.get('/users', use(userController.list))
router.get('/list', bookController.detail)
router.post('/post', bookController.addBook)

export default router
