import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('lecturers');
  },

  findAllWithAuthenInfo() {
    return db('users').leftJoin('lecturers', 'lecturers.user_id', '=', 'users.id').where('users.authority', "LECTURER");
  },

  findById(id) {
    return db('lecturers').where('user_id', id);
  },

  add(entity) {
    return db('lecturers').insert(entity);
  },

  update(id, entity) {
    return db('lecturers').update(entity).where('user_id', id);
  },

  deleteAll() {
    return db('lecturers').del();
  },

  findAllCreatedCourse(id, limit) {
    if (limit) {
      return db('courses').select('courses.id', 'courses.name', 'courses.banner_filename', 'courses.price', 'courses.sale_id', 'courses.is_completed', 'courses.short_description', 'courses.detail_description', 'courses.syllabus', 'categories.name as category_name').where('lecturer_id', id).innerJoin('categories', 'courses.category_id', '=', 'categories.id').limit(limit);
    } else {
      return db('courses').select('courses.id', 'courses.name', 'courses.banner_filename', 'courses.price', 'courses.sale_id', 'courses.is_completed', 'courses.short_description', 'courses.detail_description', 'courses.syllabus', 'categories.name as category_name').where('lecturer_id', id).innerJoin('categories', 'courses.category_id', '=', 'categories.id');
    }
  },
  findByLecturerEmail(email) {
    return db('users').leftJoin('lecturers', 'lecturers.user_id', '=', 'users.id').where({
      'users.email': email
    });
  }

};
