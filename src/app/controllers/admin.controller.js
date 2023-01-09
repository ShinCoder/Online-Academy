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
import multer from 'multer';
import path from 'path';
import slugger from '../../utils/slug.js';

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

        const queryLecturerId = req.query.lecturerId;
        const queryCategoryId = req.query.categoryId;

        const allCategories = await categoriesService.findAll();
        const allLecturers = await lecturerService.findAllWithNeedAuthenInfo();

        if (queryLecturerId) {
            const allCourses = await coursesService.findFilterByLecturerWithFullyData(queryLecturerId);
            const currentLecturer = allLecturers.find((item) => item.user_id === Number(queryLecturerId));
            res.render('admin/courses', {
                courses: allCourses,
                categories: allCategories,
                lecturers: allLecturers,
                currentLecturer: `${currentLecturer?.first_name} ${currentLecturer?.last_name}`
            });
        }
        else if (queryCategoryId) {
            const allCourses = await coursesService.findFilterByCategoryWithFullyData(queryCategoryId);
            const currentCategory = allCategories.find((item) => item.id === Number(queryCategoryId));
            res.render('admin/courses', {
                courses: allCourses,
                categories: allCategories,
                lecturers: allLecturers,
                currentCategory: currentCategory?.name
            });
        }
        else {
            const allCourses = await coursesService.findAllWithFullyData();

            res.render('admin/courses', {
                courses: allCourses,
                categories: allCategories,
                lecturers: allLecturers
            });
        }

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
    },
    async deActivateLecturer(req, res) {
        const accountId = req.params.id;
        const returningResult = await usersService.deactivate(accountId);

        res.redirect('/admin/lecturers');
    }
    ,
    async activateLecturer(req, res) {
        const accountId = req.params.id;
        const returningResult = await usersService.activate(accountId);

        res.redirect('/admin/lecturers');
    },
    async deActivateStudent(req, res) {
        const accountId = req.params.id;
        const returningResult = await usersService.deactivate(accountId);

        res.redirect('/admin/students');
    },
    async activateStudent(req, res) {
        const accountId = req.params.id;
        const returningResult = await usersService.activate(accountId);

        res.redirect('/admin/students');
    },
    async renderCategories(req, res) {
        let childCategories = await categoriesService.findAllNotGetParentDetail();
        let parentCategories = await categoriesService.findAllParent();

        const countChildDelete = await categoriesService.countCoursesOfChildCategories();
        const countParentDelete = await categoriesService.countCoursesOfParentCategories();

        if (countChildDelete && countChildDelete.length) {
            childCategories = childCategories.map((item) => {
                const findRes = countChildDelete[0].find((fItem) => fItem.id === item.id);
                let count = 0;
                if (findRes) {
                    count = findRes.count_courses
                }
                return ({
                    ...item,
                    courseCounted: count
                })
            })
        }

        if (countParentDelete && countParentDelete[0]) {
            parentCategories = parentCategories.map((item) => {
                const findRes = countParentDelete[0].find((fItem) => fItem.id === item.id);
                let count = 0;
                if (findRes) {
                    count = findRes.count_courses
                }
                return ({
                    ...item,
                    courseCounted: count
                })
            })
        }

        res.render('admin/categories', {
            childCategories: childCategories,
            parentCategories: parentCategories
        })

    },
    async renderCreateCategories(req, res) {
        const parentCategories = await categoriesService.findAllParent();

        res.render('admin/createCategory', {
            parentCategories: parentCategories,
        })
    },


    async createCategories(req, res) {
        let bannerName;

        const storageBannerImage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './src/public/images/categories_banner');
            },
            filename: function (req, file, cb) {
                const filename =
                    file.fieldname + '_' + Date.now() + path.extname(file.originalname);
                bannerName = filename;
                cb(null, filename);
            }
        });
        const upload = multer({ storage: storageBannerImage });

        upload.fields([
            {
                name: 'uploadCourseBannerInput',
                maxCount: 1
            }
        ])(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error(err);
            } else if (err) {
                console.error(err);
            }


            const slug = slugger.getCategorySlug(req.body.name);

            const resultCourse = {
                name: req.body.name,
                parent_category_id: Number(req.body.parentCategory) || null,
                banner_url: bannerName,
                slug: slug
            };

            try {
                const returningResult = await categoriesService.add(resultCourse);

                const parentCategories = await categoriesService.findAllParent();

                res.render('admin/createCategory', {
                    parentCategories: parentCategories,
                    success: "Create category successfully !!!"
                })

            } catch (error) {
                console.log('Add category error: ', error);
                //render fail screen here
            }
        });
    },

    async renderUpdateCategories(req, res) {
        const parentCategories = await categoriesService.findAllParent();
        const categoryId = req.params.id;

        const category = await categoriesService.findByIdGetParentName(categoryId);

        if (category.length) {
            res.render('admin/updateCategory', {
                category: category[0],
                parentCategories: [...parentCategories],
            })
        }
        else {
            res.redirect("/admin/categories");
        }

    },

    async updateCategories(req, res) {
        let bannerName;
        const categoryId = req.params.id;

        const storageBannerImage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './src/public/images/categories_banner');
            },
            filename: function (req, file, cb) {
                const filename =
                    file.fieldname + '_' + Date.now() + path.extname(file.originalname);
                bannerName = `/images/categories_banner/${filename}`;
                cb(null, filename);
            }
        });
        const upload = multer({ storage: storageBannerImage });

        upload.fields([
            {
                name: 'uploadCourseBannerInput',
                maxCount: 1
            }
        ])(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error(err);
            } else if (err) {
                console.error(err);
            }


            const slug = slugger.getCategorySlug(req.body.name);

            const resultCourse = {
                name: req.body.name,
                parent_category_id: Number(req.body.parentCategory) && Number(req.body.parentCategory) !== 0 ? Number(req.body.parentCategory) : null,
                banner_url: bannerName,
                slug: slug
            };

            console.log("req.body: ", req.body)
            console.log("resultCourse: ", resultCourse)

            try {
                const returningResult = await categoriesService.update(categoryId, resultCourse);

                const parentCategories = await categoriesService.findAllParent();

                res.redirect("/admin/categories");

            } catch (error) {
                console.log('Add category error: ', error);
                //render fail screen here
            }
        });
    },

    async deleteCategory(req, res) {
        const categoryId = req.params.id;

        if (categoryId) {
            const returningResult = await categoriesService.deleteById(categoryId);
        }

        res.redirect("/admin/categories");
    }
}