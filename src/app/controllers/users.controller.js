import emailValidator from 'email-validator';
import moment from 'moment';
import formatUtils from '../../utils/format.js';

import usersService from '../../services/users.service.js';
import otpsService from '../../services/otps.service.js';

import myFunction from '../../library/index.js';

import mail from '../../mail/index.js';

import bcrypt from 'bcryptjs';
import coursesService from '../../services/courses.service.js';

export default {
  async updateProfile(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name) {
        return res.render('user/profile', {
          error: 'First name cannot be empty.'
        });
      }

      if (!last_name) {
        return res.render('user/profile', {
          error: 'Last name cannot be empty.'
        });
      }

      if (!email) {
        return res.render('user/profile', {
          error: 'Email cannot be empty.'
        });
      }

      if (!emailValidator.validate(email)) {
        return res.render('user/profile', {
          error: 'Invalid email.'
        });
      }

      if (!password) {
        return res.render('user/profile', {
          error: 'Password cannot be empty.'
        });
      }

      const current_user = await usersService.findByKey({
        id: req.session.authUser.id
      });

      if (!current_user.length) {
        return res.redirect('./logout');
      }

      if (current_user[0].email != email) {
        const found_user = await usersService.findByKey({
          email: req.body.email
        });

        if (found_user.length) {
          return res.render('user/profile', {
            error: 'This email had been existed. Please use another email.'
          });
        }
      }

      const new_time = await moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      const otp = await myFunction.generateString(6);

      const sent = await mail.sendMail(
        email,
        'Verify email address',
        'http://localhost:3000/auth/otp/' + otp
      );

      if (!sent) {
        return res.render('user/profile', {
          error: 'Fail to send mail.'
        });
      }

      const new_otp = await otpsService.add({
        user_id: current_user[0].id,
        code: otp,
        type: 'verify-email',
        created_at: new_time,
        expired_at: await moment(Date.now() + 3600 * 1000).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      });

      if (!new_otp) {
        return res.render('user/profile', {
          error: 'Cannot create otp. Please try later or contact admin.'
        });
      }

      const updated_user = await usersService.update({
        id: current_user[0].id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        verified_at: null,
        updated_at: new_time
      });

      if (!updated_user) {
        return res.render('user/profile', {
          error: 'Update profile fail. Please try again or contact admin.'
        });
      }

      return res.render('user/profile', {
        success:
          'Update profile successfull. Please verify your email to keep login.'
      });
    } catch (error) {
      console.log(error);

      return res.render('user/profile', {
        error: 'Something went wrong. Please try later or contact admin.'
      });
    }
  },

  showProfile(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    res.render('user/profile', { user: req.session.authUser });
  },

  async showCourses(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    const courseList = await coursesService.findEnrolled(
      req.session.authUser.id
    );

    courseList.forEach((course) => {
      formatUtils.courseCardFormat(course);
      if (course.status == 'FINISH') course.is_completed = true;
      else course.is_completed = false;
    });

    res.render('user/user-course', { courseList: courseList });
  },

  showWatchList(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    usersService
      .getWatchlist(req.session.authUser.id)
      .then(async (result) => {
        let courseList = [];

        for (let key in result) {
          await usersService
            .getRelevantCourse(result[key].course_id)
            .then((result) => {
              formatUtils.courseCardFormat(result[0]);
              courseList.push(result[0]);
            });
        }

        res.render('user/watchlist', { watchlist: courseList });
      })
      .catch((error) => {
        res.render('user/watchlist', { watchlist: [] });
      });
  },

  async removeCourseFromWatchlist(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    const course_id = parseInt(req.params.id);

    if (!course_id) {
      return res.redirect('/user/watchlist');
    }

    await usersService.removeCourseFromWatchlist(
      req.session.authUser.id,
      parseInt(course_id)
    );

    res.redirect('/user/watchlist');
  },

  async newUpdateProfile(req, res) {
    const { username, new_password, confirm_password } = req.body;
    const updateData = {};

    if (!bcrypt.compareSync(confirm_password, req.session.authUser.identity)) {
      res.render('user/profile', {
        error: 'Old password not match, please try again !',
        user: {
          email: req.session.authUser.email,
          username: req.session.authUser.username
        }
      });
      return;
    }

    if (username) {
      updateData.username = username;
    }

    if (new_password) {
      updateData.identity = bcrypt.hashSync(new_password, 10);
    }

    try {
      const update = await usersService.update(
        req.session.authUser.id,
        updateData
      );

      if (updateData.username) {
        req.session.authUser.username = updateData.username;
      }

      if (updateData.identity) {
        req.session.authUser.identity = updateData.identity;
      }

      res.render('user/profile', {
        success: 'Successfully update data !',
        error: '',
        user: {
          email: req.session.authUser.email,
          username: updateData.username
        }
      });
    } catch (err) {
      res.render('user/profile', {
        error: err,
        user: {
          email: req.session.authUser.email,
          username: req.session.authUser.username
        }
      });
    }
  },

  async addCourseWatchlist(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    const course_id = parseInt(req.params.id);

    if (!course_id) {
      return res.redirect('/user/watchlist');
    }

    await usersService.addCourseFromWatchlist(
      req.session.authUser.id,
      parseInt(course_id)
    );

    res.redirect('/user/watchlist');
  },

  async enrollCourse(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    const course_id = parseInt(req.params.id);

    if (!course_id) {
      return res.redirect('/user/watchlist');
    }

    await usersService.enrollCourse(
      req.session.authUser.id,
      parseInt(course_id)
    );

    res.redirect('back');
  },
  async renderStudyView(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    const courseId = req.params.id;
    const lessonId = req.params.lessonId;

    const course = await coursesService.findOneWithFullyData(courseId);
    const chapters = await coursesService.findAllChapterOfCourse(courseId);

    const newAllChapters = await Promise.all(
      chapters.map(async (item) => {
        const allLessonsOfThisChapter =
          await coursesService.findAllLessonOfChapter(item?.id);

        return {
          ...item,
          lessons: [...allLessonsOfThisChapter].map((item) => ({
            ...item,
            courseId: req.params.id
          }))
        };
      })
    );

    const currentLesson = await coursesService.getLessonById(lessonId);

    res.render('courses/lessonDetailView', {
      course: course[0],
      chapters: newAllChapters,
      currentLesson: currentLesson[0]
    })
  },

  async renderInitialStudyView(req, res) {
    if (!req.session.auth) {
      return res.redirect('/auth/sign-in');
    }

    const courseId = req.params.id;
    const lessonId = req.params.lessonId;

    const course = await coursesService.findOneWithFullyData(courseId);
    const chapters = await coursesService.findAllChapterOfCourse(courseId);

    const newAllChapters = await Promise.all(
      chapters.map(async (item) => {
        const allLessonsOfThisChapter =
          await coursesService.findAllLessonOfChapter(item?.id);

        return {
          ...item,
          lessons: [...allLessonsOfThisChapter].map((item) => ({
            ...item,
            courseId: req.params.id
          }))
        };
      })
    );

    res.render('courses/lessonDetailView', {
      course: course[0],
      chapters: newAllChapters,
      currentLesson: newAllChapters.length && newAllChapters[0]?.lessons && newAllChapters[0]?.lessons?.length ? newAllChapters[0].lessons[0] : null
    })
  }
};
