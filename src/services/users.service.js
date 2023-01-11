import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('users');
  },

  add(entity) {
    return db('users').insert(entity);
  },

  deleteAll() {
    return db('users').del();
  },

  findByKey(obj) {
    return db('users').where(obj);
  },

  update(id, obj) {
    return db('users').where({ id: id }).update(obj);
  },

  getWatchlist(id) {
    return db('watchlist').where({ student_id: id });
  },

  getRelevantCourse(id) {
    return db('courses').where({ id: id });
  },

  removeCourseFromWatchlist(student_id, course_id) {
    return db('watchlist')
      .where({ student_id: student_id, course_id: course_id })
      .del();
  },

  addCourseFromWatchlist(student_id, course_id) {
    db('watchlist')
        .where('student_id', student_id)
        .andWhere('course_id', course_id)
        .then(userNameList => {
          //Check if user didn't add this course to watch list
          if (userNameList.length === 0) {
            return db('watchlist')
                .where({ student_id: student_id })
                .insert({ student_id: student_id, course_id: course_id });
          }
        })
  },

  deactivate(id) {
    return db('users').where({ id: id }).update({ is_activated: false });
  },
  activate(id) {
    return db('users').where({ id: id }).update({ is_activated: true });
  },

  enrollCourse(student_id, course_id) {
    db('enroll')
        .where('student_id', student_id)
        .andWhere('course_id', course_id)
        .then(userNameList => {
          //Check if user didn't add this course to watch list
          if (userNameList.length === 0) {
            return db('enroll')
                .insert({ student_id: student_id, course_id: course_id, status: 'LEARNING' });
          }
        })
  }
};
