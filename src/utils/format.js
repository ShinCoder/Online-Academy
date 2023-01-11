import categoriesService from '../services/categories.service.js';
import enrollService from '../services/enroll.service.js';
import lecturersService from '../services/lecturers.service.js';
import salesService from '../services/sales.service.js';
import coursesService from "../services/courses.service.js";

const STAR_0 = [-1, -1, -1, -1, -1];
const STAR_0_5 = [0, -1, -1, -1, -1];
const STAR_1 = [1, -1, -1, -1, -1];
const STAR_1_5 = [1, 0, -1, -1, -1];
const STAR_2 = [1, 1, -1, -1, -1];
const STAR_2_5 = [1, 1, 0, -1, -1];
const STAR_3 = [1, 1, 1, -1, -1];
const STAR_3_5 = [1, 1, 1, 0, -1];
const STAR_4 = [1, 1, 1, 1, -1];
const STAR_4_5 = [1, 1, 1, 1, 0];
const STAR_5 = [1, 1, 1, 1, 1];
export default {
  async courseCardFormat(course) {
    const lecturer = await lecturersService.findById(course.lecturer_id);
    course.lecturer_name = lecturer[0].first_name + ' ' + lecturer[0].last_name;

    const category = await categoriesService.findById(course.category_id);
    course.category_name = category[0].name;
    course.category_slug = category[0].slug;

    if (course.sale_id) {
      const sale = await salesService.findById(course.sale_id);
      if (sale.length) {
        course.base_price = course.price;
        const discount =
          Math.round((course.price * sale[0].discount_percent) / 100 / 1000) *
          1000;
        course.price = course.price - discount;
      }
    }

    const rating = await enrollService.getRatingByCourseId(course.id);
    if (!course.rating_point) {
      if (rating[0]) {
        course.rating_point = rating[0].ratingPoint;
      } else {
        course.rating_point = 0;
      }
    }

    if (rating[0]) course.rating_count = rating[0].ratingCount;
    else course.rating_count = 0;

    if (course.rating_point == 5) course.rating_star = STAR_5;
    else if (course.rating_point >= 4.5) course.rating_star = STAR_4_5;
    else if (course.rating_point >= 4) course.rating_star = STAR_4;
    else if (course.rating_point >= 3.5) course.rating_star = STAR_3_5;
    else if (course.rating_point >= 3) course.rating_star = STAR_3;
    else if (course.rating_point >= 2.5) course.rating_star = STAR_2_5;
    else if (course.rating_point >= 2) course.rating_star = STAR_2;
    else if (course.rating_point >= 1.5) course.rating_star = STAR_1_5;
    else if (course.rating_point >= 1) course.rating_star = STAR_1;
    else if (course.rating_point >= 0.5) course.rating_star = STAR_0_5;
    else course.rating_star = STAR_0;
  },

  async courseDetailFormat(course) {
    const lecturer = await lecturersService.findById(course.lecturer_id);
    course.lecturer_name = lecturer[0].first_name + ' ' + lecturer[0].last_name;
    course.lecturer_career = lecturer[0].career_description;
    course.lecturer_avatar = lecturer[0].avatar_url;

    const category = await categoriesService.findById(course.category_id);
    course.category_name = category[0].name;
    course.category_slug = category[0].slug;

    if (course.sale_id) {
      const sale = await salesService.findById(course.sale_id);
      if (sale.length) {
        course.base_price = course.price;
        const discount =
            Math.round((course.price * sale[0].discount_percent) / 100 / 1000) *
            1000;
        course.price = course.price - discount;
      }
    }

    const rating = await enrollService.getRatingByCourseId(course.id);
    if (!course.rating_point) {
      if (rating[0]) {
        course.rating_point = rating[0].ratingPoint;
      } else {
        course.rating_point = 0;
      }
    }

    if (rating[0]) course.rating_count = rating[0].ratingCount;
    else course.rating_count = 0;

    if (course.rating_point == 5) course.rating_star = STAR_5;
    else if (course.rating_point >= 4.5) course.rating_star = STAR_4_5;
    else if (course.rating_point >= 4) course.rating_star = STAR_4;
    else if (course.rating_point >= 3.5) course.rating_star = STAR_3_5;
    else if (course.rating_point >= 3) course.rating_star = STAR_3;
    else if (course.rating_point >= 2.5) course.rating_star = STAR_2_5;
    else if (course.rating_point >= 2) course.rating_star = STAR_2;
    else if (course.rating_point >= 1.5) course.rating_star = STAR_1_5;
    else if (course.rating_point >= 1) course.rating_star = STAR_1;
    else if (course.rating_point >= 0.5) course.rating_star = STAR_0_5;
    else course.rating_star = STAR_0;

    course.student_count = await coursesService.countStudent(course.id);
    if (course.student_count[0]) course.student_count = course.student_count[0].enrollCount;
    else course.student_count = 0;

    course.feedbacks = await coursesService.getFeedback(course.id);

    console.log('feedbaksL:', course.feedbacks[0])
  }
};
