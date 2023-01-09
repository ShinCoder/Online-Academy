import db from '../config/db/mysql.js';

export default {
  findById(id) {
    return db('sales').where('id', id);
  }
};
