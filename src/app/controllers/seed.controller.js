import data from '../../resources/data.js';
import usersService from '../../services/users.service.js';
import categoriesService from '../../services/categories.service.js';
import lecturersService from '../../services/lecturers.service.js';
import coursesService from '../../services/courses.service.js';
import coursesController from './courses.controller.js';

export default {
  // [GET] /seed/courses
  seedCourses(req, res) {},

  // [GET] /seed/categories
  seedCategories(req, res) {},

  // [GET] /seed/users
  seedUsers(req, res) {},

  // [GET] /seed/lecturers
  seedLecturers(req, res) {},

  // [GET] /seed/all
  async seedAll(req, res) {
    const result = {};

    await coursesService.deleteAll();
    await categoriesService.deleteAll();
    await lecturersService.deleteAll();
    await usersService.deleteAll();

    data.courses.forEach((course) => {
      coursesController.getUniqueSlug(course.name).then((slug) => {
        course.slug = slug;
      });
    });

    result.users = await usersService.add(data.users);
    result.lecturers = await lecturersService.add(data.lecturers);
    result.categories = await categoriesService.add(data.categories);
    result.courses = await coursesService.add(data.courses);

    res.send(result);
  }
};
