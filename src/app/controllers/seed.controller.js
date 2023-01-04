import data from '../../resources/data.js';
import usersService from '../../services/users.service.js';
import categoriesService from '../../services/categories.service.js';
import lecturersService from '../../services/lecturers.service.js';
import coursesService from '../../services/courses.service.js';
import enrollService from '../../services/enroll.service.js';
import studentsService from '../../services/students.service.js';
import slugger from '../../utils/slug.js';

export default {
  // [GET] /seed/courses
  seedCourses(req, res) {},

  // [GET] /seed/categories
  async seedCategories(req, res) {
    const result = {};

    await categoriesService.deleteAll();

    result.categories = await categoriesService.add(data.categories);

    res.send(result);
  },

  // [GET] /seed/users
  seedUsers(req, res) {},

  // [GET] /seed/lecturers
  seedLecturers(req, res) {},

  // [GET] /seed/enroll
  async seedEnroll(req, res) {
    const result = {};

    await enrollService.deleteAll();

    result.enroll = await enrollService.add(data.enroll);

    res.send(result);
  },

  // [GET] /seed/all
  async seedAll(req, res) {
    const result = {};

    await enrollService.deleteAll();
    await studentsService.deleteAll();

    await coursesService.deleteAll();
    await categoriesService.deleteAll();
    await lecturersService.deleteAll();
    await usersService.deleteAll();

    data.courses.forEach((course) => {
      slugger.getCourseUniqueSlug(course.name).then((slug) => {
        course.slug = slug;
      });
    });

    data.categories.forEach((category) => {
      category.slug = slugger.getCategorySlug(category.name);
    });

    result.users = await usersService.add(data.users);
    result.lecturers = await lecturersService.add(data.lecturers);
    result.students = await studentsService.add(data.students);
    result.categories = await categoriesService.add(data.categories);
    result.courses = await coursesService.add(data.courses);
    result.enroll = await enrollService.add(data.enroll);

    res.send(result);
  }
};
