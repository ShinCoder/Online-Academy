import express from 'express';
import coursesController from '../app/controllers/courses.controller.js';
const router = express.Router();

router.get('/category/:slug', coursesController.showByCategory);

router.post('/sortOrder', coursesController.setSortOrder);

router.get('/create', coursesController.renderCreateCourse);

router.post('/create', coursesController.postCourse);

router.post('/:id/status', coursesController.updateCourseStatus);

router.get('/chapters/create', coursesController.renderCreateChapter);

router.post('/chapters/create', coursesController.postChapter);

router.post('/chapters/lessons/create', coursesController.postLesson);

export default router;
