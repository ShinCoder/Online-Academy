import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';
import lecturersService from '../../services/lecturers.service.js';
import multer from 'multer';
import path from 'path';

export default {
    async renderAllCreatedCourse(req, res) {
        const lecturerId = 3; // [FIX] LECTURER_ID in session here

        const allCourses = await lecturersService.findAllCreatedCourse(lecturerId);

        res.render('lecturers/createdCourses', {
            createdCourses: allCourses
        });
    },

    async renderProfile(req, res) {
        const lecturerId = 3; // [FIX] LECTURER_ID in session here

        const profile = await lecturersService.findById(lecturerId);

        if (profile?.length) {
            res.render('lecturers/profile', {
                profile: profile[0]
            });
        }

    },

    async editProfile(req, res) {
        const lecturerId = 3; // [FIX] LECTURER_ID in session here

        let bannerName;

        const storageBannerImage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './src/public/images/lecturers');
            },
            filename: function (req, file, cb) {
                const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
                bannerName = filename;
                cb(null, filename);
            }
        });
        const upload = multer({ storage: storageBannerImage });

        upload.fields([
            {
                name: 'uploadProfileAvatarInput',
                maxCount: 1
            }
        ])(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error(err);
            } else if (err) {
                console.error(err);
            }


            try {

                const returningResult = await lecturersService.update(lecturerId, {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    career_description: req.body.shortDescription,
                    avatar_url: bannerName
                });

                res.redirect(`/lecturers/profile`);
            } catch (error) {
                console.log('Update course error: ', error);
                //render fail screen here
            }
        });
    },

    async renderCreateProfile(req, res) {
        res.render('lecturers/createProfile');
    },

    async postProfile(req, res) {
        const lecturerId = 4; // [FIX] LECTURER_ID in session here
        
        let bannerName;

        const storageBannerImage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './src/public/images/lecturers');
            },
            filename: function (req, file, cb) {
                const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
                bannerName = filename;
                cb(null, filename);
            }
        });
        const upload = multer({ storage: storageBannerImage });

        upload.fields([
            {
                name: 'uploadProfileAvatarInput',
                maxCount: 1
            }
        ])(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error(err);
            } else if (err) {
                console.error(err);
            }


            try {

                const returningResult = await lecturersService.add({
                    user_id: lecturerId,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    career_description: req.body.shortDescription,
                    avatar_url: bannerName
                });

                res.redirect(`/lecturers/courses/created`);
            } catch (error) {
                console.log('Update course error: ', error);
                //render fail screen here
            }
        });
    }
}