import express from 'express';
import lecturersController from '../app/controllers/lecturers.controller.js';
const router = express.Router();

router.get('/courses/created', lecturersController.renderAllCreatedCourse);
router.get('/profile', lecturersController.renderProfile);
router.get('/profile/create', lecturersController.renderCreateProfile);
router.post('/profile/create', lecturersController.postProfile);
router.post('/profile/update', lecturersController.editProfile);
export default router;
