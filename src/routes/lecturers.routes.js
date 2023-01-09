import express from 'express';
import lecturersController from '../app/controllers/lecturers.controller.js';
const router = express.Router();
import auth from '../middlewares/auth.mdw.js';

router.get('/courses/created', auth(["LECTURER"]), lecturersController.renderAllCreatedCourse);
router.get('/profile', auth(["LECTURER"]), lecturersController.renderProfile);
router.get('/profile/create', auth(["LECTURER"]), lecturersController.renderCreateProfile);
router.post('/profile/create', auth(["LECTURER"]), lecturersController.postProfile);
router.post('/profile/update', auth(["LECTURER"]), lecturersController.editProfile);
export default router;
