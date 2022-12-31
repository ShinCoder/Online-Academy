import express from 'express';
import coursesController from '../app/controllers/courses.controller.js';
const router = express.Router();

router.get('/category/:slug', coursesController.showByCategory);

export default router;
