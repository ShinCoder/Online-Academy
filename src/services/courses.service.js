import db from '../config/db/mysql.js';

export default {
  findAll() {
    return db('courses');
  },

  findAllWithFullyData() {
    return db('courses')
      .select(
        'courses.id',
        'courses.name',
        'courses.price',
        'courses.is_completed',
        'courses.is_activated',
        'categories.name as categories_name',
        'lecturers.first_name',
        'lecturers.last_name',
        'users.email'
      )
      .innerJoin('lecturers', 'courses.lecturer_id', '=', 'lecturers.user_id')
      .innerJoin('categories', 'courses.category_id', '=', 'categories.id')
      .innerJoin('users', 'lecturers.user_id', '=', 'users.id');
  },

  findAllWithDate(sort, limit) {
    if (limit) {
      return db('courses').orderBy('created_at', sort).limit(limit);
    } else {
      return db('courses').orderBy('created_at', sort);
    }
  },

  findAllWithDuration(duration, limit) {
    if (limit) {
      return db('courses')
        .whereBetween('created_at', [duration.start, duration.end])
        .andWhere('is_activated', true)
        .orderBy('created_at', 'desc')
        .limit(limit);
    } else {
      return db('courses')
        .whereBetween('created_at', [duration.start, duration.end])
        .andWhere('is_activated', true)
        .orderBy('created_at', 'desc');
    }
  },

  findAllAndRating(limit, offset, sort) {
    if (sort) {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.course_id', { as: 'purchased_count' })
        .where('is_activated', true)
        .groupBy('courses.id')
        .orderBy(sort)
        .limit(limit)
        .offset(offset);
    } else {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.rate_point', { as: 'purchased_count' })
        .where('is_activated', true)
        .groupBy('courses.id')
        .limit(limit)
        .offset(offset);
    }
  },

  findAllAndRatingByCategory(id, limit, offset, sort) {
    if (sort) {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.course_id', { as: 'purchased_count' })
        .whereIn('courses.category_id', id)
        .andWhere('is_activated', true)
        .groupBy('courses.id')
        .orderBy(sort)
        .limit(limit)
        .offset(offset);
    } else {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.rate_point', { as: 'purchased_count' })
        .whereIn('courses.category_id', id)
        .andWhere('is_activated', true)
        .groupBy('courses.id')
        .limit(limit)
        .offset(offset);
    }
  },

  findAllAndRatingBySearch(searchString, limit, offset, sort) {
    if (sort) {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.course_id', { as: 'purchased_count' })
        .whereRaw(`MATCH(name) AGAINST('${searchString}')`)
        .andWhere('is_activated', true)
        .groupBy('courses.id')
        .orderBy(sort)
        .limit(limit)
        .offset(offset);
    } else {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.rate_point', { as: 'purchased_count' })
        .whereRaw(`MATCH(name) AGAINST('${searchString}')`)
        .andWhere('is_activated', true)
        .groupBy('courses.id')
        .limit(limit)
        .offset(offset);
    }
  },

  findAllAndRatingBySearchAndCategory(searchString, id, limit, offset, sort) {
    if (sort) {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.course_id', { as: 'purchased_count' })
        .whereIn('courses.category_id', id)
        .andWhere(db.raw(`MATCH(name) AGAINST('${searchString}')`))
        .andWhere('is_activated', true)
        .groupBy('courses.id')
        .orderBy(sort)
        .limit(limit)
        .offset(offset);
    } else {
      return db('courses')
        .leftJoin('enroll', 'courses.id', '=', 'enroll.course_id')
        .select('courses.*')
        .avg('enroll.rate_point', { as: 'rating_point' })
        .count('enroll.rate_point', { as: 'purchased_count' })
        .whereIn('courses.category_id', id)
        .andWhere(db.raw(`MATCH(name) AGAINST('${searchString}')`))
        .andWhere('is_activated', true)
        .groupBy('courses.id')
        .limit(limit)
        .offset(offset);
    }
  },

  findFeatured() {
    return db('courses')
      .where('is_featured', true)
      .andWhere('is_activated', true);
  },

  getHotId(duration, limit) {
    return db('courses')
      .join('enroll', 'courses.id', '=', 'enroll.course_id')
      .select('courses.id')
      .groupBy('courses.id')
      .whereBetween('enroll.enroll_date', [duration.start, duration.end])
      .andWhere('is_activated', true)
      .orderByRaw('count(enroll.course_id) desc')
      .limit(limit);
  },

  getBestSellerId(limit) {
    return db('courses')
      .join('enroll', 'courses.id', '=', 'enroll.course_id')
      .select('courses.id')
      .where('is_activated', true)
      .groupBy('courses.id')
      .orderByRaw('count(enroll.course_id) desc')
      .limit(limit);
  },

  getNewestId(duration, limit) {
    return db('courses')
      .select('courses.id')
      .whereBetween('created_at', [duration.start, duration.end])
      .andWhere('is_activated', true)
      .orderBy('created_at', 'desc')
      .limit(limit);
  },

  findById(id) {
    if (typeof id === 'object') {
      return db('courses').whereIn('id', id).andWhere('is_activated', true);
    } else {
      return db('courses').where('id', id).andWhere('is_activated', true);
    }
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
    return db('courses')
      .where('category_id', id)
      .andWhere('is_activated', true);
  },

  countAll() {
    return db('courses')
      .select(db.raw('count(*) as counts'))
      .where('is_activated', true);
  },

  countByCategory(id) {
    return db('courses')
      .select(db.raw('count(*) as counts'))
      .whereIn('category_id', id)
      .andWhere('is_activated', true);
  },

  countBySearch(searchString) {
    return db('courses')
      .select(db.raw('count(*) as counts'))
      .whereRaw(`MATCH(name) AGAINST('${searchString}')`)
      .andWhere('is_activated', true);
  },

  countBySearchAndCategory(searchString, id) {
    return db('courses')
      .select(db.raw('count(*) as counts'))
      .whereIn('category_id', id)
      .andWhereRaw(`MATCH(name) AGAINST('${searchString}')`)
      .andWhere('is_activated', true);
  },

  updateStatus(id, isCompleted) {
    return db('courses').update({ is_completed: isCompleted }).where('id', id);
  },

  updateCourse(id, entity) {
    return db('courses').update(entity).where('id', id);
  },

  updateChapter(id, entity) {
    return db('chapters').update(entity).where('id', id);
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
    return db('lessons').update(entity).where('id', id);
  },

  activateCourse(id) {
    return db('courses').where('id', id).update('is_activated', true);
  },
  deactivateCourse(id) {
    return db('courses').where('id', id).update('is_activated', false);
  }
};
