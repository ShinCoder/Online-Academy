import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('lecturers');
  },

  findById(id) {
    return db('lecturers').where('user_id', id);
  },

  add(entity) {
    return db('lecturers').insert(entity);
  },

  deleteAll() {
    return db('lecturers').del();
  }
};
