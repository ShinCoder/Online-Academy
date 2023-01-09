import express from 'express';
import coursesController from '../app/controllers/courses.controller.js';
const router = express.Router();
import auth from '../middlewares/auth.mdw.js';

router.get('/category/:slug', auth(["STUDENT"]), coursesController.showByCategory);

router.get('/search', auth(["STUDENT"]), coursesController.showBySearch);

router.get('/all', auth(["STUDENT"]), coursesController.showAll);

router.post('/sortOrder', auth(["STUDENT"]), coursesController.setSortOrder);

router.post('/filter', auth(["STUDENT"]), coursesController.setFilter);

router.get('/create', auth(["LECTURER"]), coursesController.renderCreateCourse);

router.post('/create', auth(["LECTURER"]), coursesController.postCourse);

router.post('/:id/status', auth(["LECTURER"]), coursesController.updateCourseStatus);

router.get('/:id/chapters/create', auth(["LECTURER"]), coursesController.renderCreateChapter);

router.post('/:id/chapters/create', auth(["LECTURER"]), coursesController.postChapter);

router.get(
  '/:id/chapters/:chapterId/lessons/create',
  auth(["LECTURER"]), 
  coursesController.renderCreateLesson
);

router.post(
  '/:id/chapters/:chapterId/lessons/create',
  auth(["LECTURER"]), 
  coursesController.postLesson
);

router.get('/:id/update', auth(["LECTURER"]), coursesController.renderUpdateCourse);

router.post('/:id/update', auth(["LECTURER"]),  coursesController.updateCourse);

router.get('/:id/chapters/update', auth(["LECTURER"]), coursesController.renderUpdateChapter);

router.post('/:id/chapters/:chapterId/update', auth(["LECTURER"]), coursesController.updateChapter);

router.get(
  '/:id/chapters/:chapterId/lessons/:lessonId/update',
  auth(["LECTURER"]), 
  coursesController.renderUpdateLesson
);

router.post(
  '/:id/chapters/:chapterId/lessons/:lessonId/update',
  auth(["LECTURER"]), 
  coursesController.updateLesson
);

router.post(
  '/:id/chapters/create-on-update',
  auth(["LECTURER"]), 
  coursesController.postChapterOnUpdate
);

router.get(
  '/:id/chapters/:chapterId/lessons/create-on-update',
  auth(["LECTURER"]), 
  coursesController.renderCreateLessonOnUpdate
);

router.post(
  '/:id/chapters/:chapterId/lessons/create-on-update',
  auth(["LECTURER"]), 
  coursesController.createLessonOnUpdate
);

export default router;
