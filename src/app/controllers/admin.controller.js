import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';
import lecturersService from '../../services/lecturers.service.js';
import studentsService from '../../services/students.service.js';
import usersService from '../../services/users.service.js';
import otpsService from '../../services/otps.service.js';
import bcrypt from 'bcryptjs';
import emailValidator from 'email-validator';
import moment from 'moment';
import myFunction from '../../library/index.js';
import lecturerService from "../../services/lecturers.service.js";
import mail from '../../mail/index.js';

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

        const email = req.body.email;
        const password = req.body.password;

        const found_user = await lecturersService.findByLecturerEmail(email);


        if (found_user.length) {
            return res.render('admin/createLecturer', {
                error: 'This email had signed up. Please choose another email.'
            });
        }

        const new_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const otp = await myFunction.generateString(6);

        const sent = await mail.sendMail(
            email,
            'Verify email address',
            'http://localhost:3000/auth/otp/' + otp
        );

        if (!sent) {
            return res.render('auth/sign-up', {
                error: 'Fail to send mail.'
            });
        }

        const new_user = await usersService.add({
            email: email,
            username: email,
            authority: "LECTURER",
            identity: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });

        if (!new_user) {
            return res.render('admin/createLecturer', {
                error: 'Fail to create account.'
            });
        }

        const new_otp = await otpsService.add({
            user_id: new_user[0],
            code: otp,
            type: 'verify-email',
            created_at: new_time,
            expired_at: moment(Date.now() + 3600 * 1000).format(
                'YYYY-MM-DD HH:mm:ss'
            )
        });

        if (!new_otp) {
            return res.render('admin/createLecturer', {
                error: 'Fail to create otp.'
            });
        }

        return res.render('admin/createLecturer', {
            success: 'Successfully create lecturer account ! You can add another one'
        });

    },
    async deActivateCourse(req, res) {
        const courseId = req.params.id;
        const returningResult = await coursesService.deactivateCourse(courseId);

        res.redirect('/admin/courses');
    }
    ,
    async activateCourse(req, res) {
        const courseId = req.params.id;
        const returningResult = await coursesService.activateCourse(courseId);

        res.redirect('/admin/courses');
    }
}