import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('lecturers');
  },

  add(entity) {
    return db('lecturers').insert(entity);
  },

  deleteAll() {
    return db('lecturers').del();
  }
};
