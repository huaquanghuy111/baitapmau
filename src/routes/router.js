import express from 'express';
import bookController from '../controller/bookController';

const router = express.Router();
router.get('/', bookController.detail);
router.post('/post', bookController.addBook);

export default router;
