import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('categories');
  },

  add(entity) {
    return db('categories').insert(entity);
  },

  deleteAll() {
    return db('categories').del();
  }
};
