import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('students');
  },

  add(entity) {
    return db('students').insert(entity);
  },

  deleteAll() {
    return db('students').del();
  }
};
