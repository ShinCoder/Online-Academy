import express from 'express';
import adminController from '../app/controllers/admin.controller.js';
const router = express.Router();

router.get('/lecturers', adminController.renderAllLecturers);
router.get('/lecturer/create', adminController.renderCreateLecturer);
router.post('/lecturer/create', adminController.createLecturerAccount);
router.get('/courses', adminController.renderAllCourses);
router.get('/students', adminController.renderAllStudents);

export default router;
