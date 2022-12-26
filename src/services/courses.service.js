import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('courses');
  },

  add(entity) {
    return db('courses').insert(entity);
  },

  deleteAll() {
    return db('courses').del();
  }
};
