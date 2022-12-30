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
  },

  findSlugAlike(str) {
    return db('courses').whereILike('slug', `${str}%`);
  },

  findByCategoryId(id) {
    return db('courses').where('id', id);
  }
};
