import express from 'express';


const router = express.Router();

import courseController from '../app/controllers/courses.controller.js';

router.get('/create', courseController.renderCreateCourse);

router.post('/create', courseController.postCourse);

router.post('/chapters/create', courseController.postChapter)

router.post('/chapters/lessons/create', courseController.postLesson)

export default router;
