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
router.post('/lecturers/:id/activate', auth(["ADMIN"]), adminController.activateLecturer);
router.post('/lecturers/:id/deactivate', auth(["ADMIN"]), adminController.deActivateLecturer);
router.post('/students/:id/activate', auth(["ADMIN"]), adminController.activateStudent);
router.post('/students/:id/deactivate', auth(["ADMIN"]), adminController.deActivateStudent);
router.get('/categories', auth(["ADMIN"]), adminController.renderCategories);
router.get('/categories/create', auth(["ADMIN"]), adminController.renderCreateCategories);
router.post('/categories/create', auth(["ADMIN"]), adminController.createCategories);
router.get('/categories/:id/update', auth(["ADMIN"]), adminController.renderUpdateCategories);
router.post('/categories/:id/update', auth(["ADMIN"]), adminController.updateCategories);
router.post('/categories/:id/delete', auth(["ADMIN"]), adminController.deleteCategory);

export default router;
