import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('categories');
  },

  findById(id) {
    return db('categories').where('id', id);
  },

  findBySlug(slug) {
    return db('categories').where('slug', slug);
  },

  add(entity) {
    return db('categories').insert(entity);
  },

  deleteAll() {
    return db('categories').del();
  }
};
