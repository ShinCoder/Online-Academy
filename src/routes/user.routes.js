import express from 'express';
const router = express.Router();
import userController from '../app/controllers/users.controller.js';

router.get('/profile', (req, res) => {
    userController.showProfile(req, res);
});

router.get('/courses', (req, res) => {
    userController.showCourses(req, res);
})

router.get('/watchlist', (req, res) => {
    userController.showWatchList(req, res); 
})

router.get('/watchlist/remove/:id', (req, res) => {
    userController.removeCourseFromWatchlist(req, res);
});

router.post('/profile/update', (req, res) => {
    userController.newUpdateProfile(req, res);
});

export default router;