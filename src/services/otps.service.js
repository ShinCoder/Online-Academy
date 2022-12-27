import db from '../config/db/mysql.js';

export default {
  findByKey(obj) {
    return db('otps').where(obj);
  },
  add(obj) {
    return db('otps').insert(obj);
  },
  update(id, obj) {
    return db('otps').where({id: id}).update(obj);
  }
};
