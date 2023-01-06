import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';
import lecturersService from '../../services/lecturers.service.js';
import studentsService from '../../services/students.service.js';

export default {
    async renderAllLecturers(req, res) {

        const allLecturers = await lecturersService.findAllWithAuthenInfo();

        res.render('admin/lecturers', {
            lecturers: allLecturers
        });
    },
    async renderCreateLecturer(req, res) {
        res.render('admin/createLecturer');
    },
    async renderAllStudents(req, res) {

        const allStudents = await studentsService.findAllWithAuthenInfo();

        res.render('admin/students', {
            students: allStudents
        });
    },
    async renderAllCourses(req, res) {

        const allCourses = await coursesService.findAllWithFullyData();

        res.render('admin/courses', {
            courses: allCourses
        });
    },
    async createLecturerAccount(req, res) {

        // const allStudents = await lecturersService.findAllCreatedCourse();

        // res.render('admin/students', {
        //     students: allStudents
        // });

        const found_user = await lecturersService.findByLecturerEmail({
            email: req.body.email
        });

        if (found_user.length) {
            return res.render('admin/lecturers', {
                error: 'This email had signed up. Please choose another email.'
            });
        }
    }
}