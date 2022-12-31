import express from 'express';


const router = express.Router();

import courseController from '../app/controllers/courses.controller.js';

router.get('/create', courseController.renderCreateCourse);

router.post('/create', courseController.postCourse);

router.get('/create/:courseId/chapter/create', courseController.renderCreateChapter)

export default router;
