import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('students');
  },

  findAllWithAuthenInfo() {
    return db('users').leftJoin('students', 'students.user_id', '=', 'users.id').where('users.authority', "STUDENT");
  },

  add(entity) {
    return db('students').insert(entity);
  },

  deleteAll() {
    return db('students').del();
  }
};
