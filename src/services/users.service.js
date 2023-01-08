import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('users');
  },

  add(entity) {
    return db('users').insert(entity);
  },

  deleteAll() {
    return db('users').del();
  },

  findByKey(obj) {
    return db('users').where(obj);
  },

  update(id, obj) {
    return db('users').where({id: id}).update(obj);
  }
};
