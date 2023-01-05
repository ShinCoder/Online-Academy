import categoriesService from '../services/categories.service.js';
import coursesService from '../services/courses.service.js';
import enrollService from '../services/enroll.service.js';

export default function (app) {
  app.use(async function (req, res, next) {
    let length = 0;
    const HOT_CATEGORY_LIMIT = 5;
    // categories
    let categoriesList = await categoriesService.findAll();
    const date = new Date().toISOString().slice(0, 10);
    const dateMin7 = new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .slice(0, 10);
    const enroll = await enrollService.countByCourseIdWithDate({
      start: dateMin7,
      end: date
    });

    categoriesList = categoriesList.map((category) => {
      if (category.parent_category_id) {
        category.enrollCount = 0;
        return category;
      }
      category.child_categories = [];
      return category;
    });

    length = enroll.length;
    for (let i = 0; i < length; i++) {
      const course = await coursesService.findById(enroll[i].course_id);
      const cat = categoriesList.find((category) => {
        return category.id == course[0].category_id;
      });
      cat.enrollCount += enroll[i].counts;
    }

    categoriesList.sort((c1, c2) => {
      if (c1.enrollCount === undefined) return 1;
      if (c2.enrollCount === undefined) return -1;
      return c2.enrollCount - c1.enrollCount;
    });

    length = categoriesList.length;
    for (let i = 0; i < length; i++) {
      if (categoriesList[i].enrollCount == 0) break;
      categoriesList[i].hot = true;
      categoriesList[
        categoriesList.findIndex(
          (category) => category.id === categoriesList[i].parent_category_id
        )
      ].hot = true;
      if (i >= HOT_CATEGORY_LIMIT) break;
    }

    while (categoriesList[0].parent_category_id) {
      categoriesList[
        categoriesList.findIndex(
          (category) => category.id === categoriesList[0].parent_category_id
        )
      ].child_categories.push(categoriesList[0]);
      categoriesList.shift();
    }
    res.locals.lcCategories = categoriesList;
    res.locals.currentCategory = null;
    next();
  });

  app.use(function (req, res, next) {
    if (typeof req.session.viewSort === 'undefined') {
      req.session.viewSort = {};
    }
    res.locals.viewSort = req.session.viewSort;
    next();
  });
}
