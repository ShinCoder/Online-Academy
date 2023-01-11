import express from 'express';
const router = express.Router();
import userController from '../app/controllers/users.controller.js';
import auth from '../middlewares/auth.mdw.js';

router.get('/profile', auth(['STUDENT']), (req, res) => {
  userController.showProfile(req, res);
});

router.get('/courses', auth(['STUDENT']), (req, res) => {
  userController.showCourses(req, res);
});

router.get('/watchlist', auth(['STUDENT']), (req, res) => {
  userController.showWatchList(req, res);
});

router.get('/watchlist/remove/:id', auth(['STUDENT']), (req, res) => {
  userController.removeCourseFromWatchlist(req, res);
});

router.post('/profile/update', auth(['STUDENT']), (req, res) => {
  userController.newUpdateProfile(req, res);
});

export default router;
