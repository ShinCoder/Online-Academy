import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('categories');
  },

  findAllNotGetParent() {
    return db('categories').whereNotNull("parent_category_id");
  },

  findAllNotGetParentDetail() {
    return db('categories as c1').select("c1.id", "c1.name", "c2.name as p_name", "c1.parent_category_id").whereNotNull("c1.parent_category_id").innerJoin('categories as c2', 'c1.parent_category_id', '=', 'c2.id');
  },


  findAllParent() {
    return db('categories').whereNull("parent_category_id");
  },

  findById(id) {
    return db('categories').where('id', id);
  },

  findByIdGetParentName(id) {
    return db('categories as c1').select("c1.id", "c1.name", "c2.name as p_name", "c1.parent_category_id", "c1.banner_url").leftJoin('categories as c2', 'c1.parent_category_id', '=', 'c2.id').where('c1.id', id);
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

  async deleteById(id) {
    await db('categories').del().where('parent_category_id', id);
    return db('categories').del().where('id', id);
  },

  findByName(name) {
    return db('categories').where('name', name);
  },

  update(id, entity) {
    return db('categories').update(entity).where('id', id);
  },

  countCoursesOfChildCategories() {
    return db.raw(`SELECT categories.id, categories.name, COUNT(courses.id) as count_courses FROM courses INNER JOIN categories ON courses.category_id = categories.id GROUP BY categories.id`)
  },

  countCoursesOfParentCategories() {
    return db.raw(`SELECT c2.id, COUNT(courses.id) as count_courses FROM courses INNER JOIN categories as c1 ON courses.category_id = c1.id INNER JOIN categories as c2 ON c2.id = c1.parent_category_id GROUP BY c2.id`)
  }

};
