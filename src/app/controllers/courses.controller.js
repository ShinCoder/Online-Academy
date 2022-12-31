import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';

export default {
  // [GET] /courses/categories/:slug
  async showByCategory(req, res) {
    const category = await categoriesService.findBySlug(req.params.slug);
    const courses = await coursesService.findByCategoryId(category[0].id);

    res.render('courses');
  }
};
