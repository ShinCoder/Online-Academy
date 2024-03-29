import express from 'express';
import coursesController from '../app/controllers/courses.controller.js';
const router = express.Router();
import auth from '../middlewares/auth.mdw.js';
import userController from '../app/controllers/users.controller.js';

router.get('/category/:slug', coursesController.showByCategory);

router.get('/search', coursesController.showBySearch);

router.get('/all', coursesController.showAll);

router.post('/sortOrder', coursesController.setSortOrder);

router.post('/filter', coursesController.setFilter);

router.get('/create', auth(['LECTURER']), coursesController.renderCreateCourse);

router.post('/create', auth(['LECTURER']), coursesController.postCourse);

router.post(
  '/:id/status',
  auth(['LECTURER']),
  coursesController.updateCourseStatus
);

router.get(
  '/:id/chapters/create',
  auth(['LECTURER']),
  coursesController.renderCreateChapter
);

router.post(
  '/:id/chapters/create',
  auth(['LECTURER']),
  coursesController.postChapter
);

router.get(
  '/:id/chapters/:chapterId/lessons/create',
  auth(['LECTURER']),
  coursesController.renderCreateLesson
);

router.post(
  '/:id/chapters/:chapterId/lessons/create',
  auth(['LECTURER']),
  coursesController.postLesson
);

router.get(
  '/:id/update',
  auth(['LECTURER']),
  coursesController.renderUpdateCourse
);

router.post('/:id/update', auth(['LECTURER']), coursesController.updateCourse);

router.get(
  '/:id/chapters/update',
  auth(['LECTURER']),
  coursesController.renderUpdateChapter
);

router.post(
  '/:id/chapters/:chapterId/update',
  auth(['LECTURER']),
  coursesController.updateChapter
);

router.get(
  '/:id/chapters/:chapterId/lessons/:lessonId/update',
  auth(['LECTURER']),
  coursesController.renderUpdateLesson
);

router.post(
  '/:id/chapters/:chapterId/lessons/:lessonId/update',
  auth(['LECTURER']),
  coursesController.updateLesson
);

router.post(
  '/:id/chapters/create-on-update',
  auth(['LECTURER']),
  coursesController.postChapterOnUpdate
);

router.get(
  '/:id/chapters/:chapterId/lessons/create-on-update',
  auth(['LECTURER']),
  coursesController.renderCreateLessonOnUpdate
);

router.post(
  '/:id/chapters/:chapterId/lessons/create-on-update',
  auth(['LECTURER']),
  coursesController.createLessonOnUpdate
);

router.get('/course-detail/:slug', coursesController.showCourseDetail);

router.get('/course-detail/add-watchlist/:id', (req, res) => {
  userController.addCourseWatchlist(req, res);
});

router.get('/course-detail/enroll/:id', (req, res) => {
  userController.enrollCourse(req, res);
});

router.get('/:id/chapters/:chapterId/lessons/:lessonId/learn', (req, res) => {
  userController.renderStudyView(req, res);
});

router.get('/:id/learn', (req, res) => {
  userController.renderInitialStudyView(req, res);
});

router.post('/course-detail/ratings/:id', auth(['STUDENT']), (req, res) => {
  coursesController.sendRatings(req, res);
});

export default router;
