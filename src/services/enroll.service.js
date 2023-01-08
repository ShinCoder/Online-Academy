import db from '../config/db/mysql.js';

export default {
  add(entity) {
    return db('enroll').insert(entity);
  },

  deleteAll() {
    return db('enroll').del();
  },

  countByCourseIdWithDate(duration) {
    if (duration) {
      return db('enroll')
        .select('course_id')
        .count('*', { as: 'counts' })
        .groupBy('course_id')
        .whereBetween('enroll_date', [duration.start, duration.end]);
    }
  },

  countByCourseId(limit) {
    if (limit) {
      return db('enroll')
        .select('course_id')
        .count('*', { as: 'counts' })
        .groupBy('course_id')
        .orderBy('counts', 'desc')
        .limit(limit);
    } else {
      return db('enroll')
        .select('course_id')
        .count('*', { as: 'counts' })
        .groupBy('course_id')
        .orderBy('counts', 'desc');
    }
  },

  getRatingByCourseId(id) {
    return db('enroll')
      .select('course_id')
      .avg('rate_point', { as: 'ratingPoint' })
      .count('*', { as: 'ratingCount' })
      .whereNotNull('enroll.rate_point')
      .andWhere('course_id', id)
      .groupBy('course_id');
  }
};
