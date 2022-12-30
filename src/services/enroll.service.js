import db from '../config/db/mysql.js';

export default {
  add(entity) {
    return db('enroll').insert(entity);
  },

  deleteAll() {
    return db('enroll').del();
  },

  findByDate(duration) {
    return db('enroll').whereBetween('enroll_date', [
      duration.start,
      duration.end
    ]);
  }
};
