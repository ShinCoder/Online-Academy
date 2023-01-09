import express from 'express';
import adminController from '../app/controllers/admin.controller.js';
const router = express.Router();
import auth from '../middlewares/auth.mdw.js';

router.get('/lecturers', auth(["ADMIN"]), adminController.renderAllLecturers);
router.get('/lecturer/create', auth(["ADMIN"]), adminController.renderCreateLecturer);
router.post('/lecturer/create', auth(["ADMIN"]), adminController.createLecturerAccount);
router.get('/courses', auth(["ADMIN"]), adminController.renderAllCourses);
router.get('/students', auth(["ADMIN"]), adminController.renderAllStudents);
router.post('/courses/:id/activate', auth(["ADMIN"]), adminController.activateCourse);
router.post('/courses/:id/deactivate', auth(["ADMIN"]), adminController.deActivateCourse);
export default router;
