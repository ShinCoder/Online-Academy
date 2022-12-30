import categoriesService from '../../services/categories.service.js';
import enrollService from '../../services/enroll.service.js';
import coursesService from '../../services/courses.service.js';

const HOT_CATEGORY_LIMIT = 5;

export default {
  // [GET] /home
  async showHome(req, res) {
    let categoriesList = await categoriesService.findAll();
    const date = new Date().toISOString().slice(0, 10);
    const dateMin7 = new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .slice(0, 10);
    const enroll = await enrollService.findByDate({
      start: dateMin7,
      end: date
    });

    categoriesList = await Promise.all(
      categoriesList.map(async (category) => {
        if (category.parent_category_id) {
          let sum = 0;
          let courses = await coursesService.findByCategoryId(category.id);
          sum = courses.reduce((accum, course) => {
            const enrollCount = enroll.filter(
              (en) => en.course_id == course.id
            );
            return accum + enrollCount.length;
          }, 0);
          category.enrollCount = sum;
          return category;
        } else {
          category.child_categories = [];
          return category;
        }
      })
    );

    categoriesList.sort((c1, c2) => {
      if (c1.enrollCount === undefined) return 1;
      if (c2.enrollCount === undefined) return -1;
      return c2.enrollCount - c1.enrollCount;
    });

    for (let i = 0; i < categoriesList.length; i++) {
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

    res.render('home', {
      categories: categoriesList
    });
  }
};
