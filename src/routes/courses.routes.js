import express from 'express';
import coursesController from '../app/controllers/courses.controller.js';
const router = express.Router();

router.get('/category/:slug', coursesController.showByCategory);

router.get('/search', coursesController.showBySearch);

router.post('/sortOrder', coursesController.setSortOrder);

router.post('/filter', coursesController.setFilter);

router.get('/create', coursesController.renderCreateCourse);

router.post('/create', coursesController.postCourse);

router.post('/:id/status', coursesController.updateCourseStatus);

router.get('/:id/chapters/create', coursesController.renderCreateChapter);

router.post('/:id/chapters/create', coursesController.postChapter);

router.get(
  '/:id/chapters/:chapterId/lessons/create',
  coursesController.renderCreateLesson
);

router.post(
  '/:id/chapters/:chapterId/lessons/create',
  coursesController.postLesson
);

router.get('/:id/update', coursesController.renderUpdateCourse);

router.post('/:id/update', coursesController.updateCourse);

router.get('/:id/chapters/update', coursesController.renderUpdateChapter);

router.post('/:id/chapters/:chapterId/update', coursesController.updateChapter);

router.get(
  '/:id/chapters/:chapterId/lessons/:lessonId/update',
  coursesController.renderUpdateLesson
);

router.post(
  '/:id/chapters/:chapterId/lessons/:lessonId/update',
  coursesController.updateLesson
);

router.post(
  '/:id/chapters/create-on-update',
  coursesController.postChapterOnUpdate
);

router.get(
  '/:id/chapters/:chapterId/lessons/create-on-update',
  coursesController.renderCreateLessonOnUpdate
);

router.post(
  '/:id/chapters/:chapterId/lessons/create-on-update',
  coursesController.createLessonOnUpdate
);

export default router;
