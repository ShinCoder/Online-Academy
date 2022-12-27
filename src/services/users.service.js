import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('users').where({
      deleted_at: null
    });
  },
  findByKey(obj) {
    return db('users').where(obj);
  },
  add(obj) {
    return db('users').insert(obj);
  },
  update(id, obj) {
    return db('users').where({id: id}).update(obj);
  }
};
