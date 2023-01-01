import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('courses');
  },

  findAllWithDate(sort, limit) {
    if (limit) {
      return db('courses').orderBy('created_at', sort).limit(limit);
    } else {
      return db('courses').orderBy('created_at', sort);
    }
  },

  findById(id) {
    return db('courses').where('id', id);
  },

  add(entity) {
    return db('courses').insert(entity);
  },

  addChapter(entity) {
    return db('chapters').insert(entity);
  },

  addLesson(entity) {
    return db('lessons').insert(entity);
  },

  deleteAll() {
    return db('courses').del();
  },

  findSlugAlike(str) {
    return db('courses').whereILike('slug', `${str}%`);
  },

  findByCategoryId(id) {
    return db('courses').where('category_id', id);
  },

  updateStatus(id, isCompleted) {
    return db('courses').update({'is_completed': isCompleted}).where('id', id)
  }
};
