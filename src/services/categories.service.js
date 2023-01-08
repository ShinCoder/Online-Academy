import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('categories');
  },

  findAllNotGetParent() {
    return db('categories').whereNotNull("parent_category_id");
  },

  findById(id) {
    return db('categories').where('id', id);
  },
  
  findByIdNotGetParent(id) {
    return db('categories').where('id', id).whereNotNull("parent_category_id");
  },

  findByParentId(id) {
    return db('categories').where('parent_category_id', id);
  },

  findBySlug(slug) {
    return db('categories').where('slug', slug);
  },

  add(entity) {
    return db('categories').insert(entity);
  },

  deleteAll() {
    return db('categories').del();
  },

  findByName(name) {
    return db('categories').where('name', name);
  }
};
