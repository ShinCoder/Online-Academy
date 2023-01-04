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

  findAllAndRating(sort) {
    if (sort) {
    } else {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.rate_point', { as: 'rating_count' })
        .groupBy('courses.id');
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
    return db('courses').update({ 'is_completed': isCompleted }).where('id', id)
  },

  updateCourse(id, entity) {
    return db('courses').update(entity).where('id', id)
  },

  updateChapter(id, entity) {
    return db('chapters').update(entity).where('id', id)
  },

  findAllChapterOfCourse(courseId) {
    return db('chapters').where('course_id', courseId);
  },

  findAllLessonOfChapter(chapterId) {
    return db('lessons').where('chapter_id', chapterId);
  },

  getLessonById(id) {
    return db('lessons').where('id', id);
  },

  getChapterById(id) {
    return db('chapters').where('id', id);
  },

  updateLesson(id, entity) {
    return db('lessons').update(entity).where('id', id)
  },
};
