import db from '../config/db/mysql';

export default {
  findAll() {
    return db('example');
  }
};
