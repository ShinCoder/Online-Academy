import formatUtils from '../../utils/format.js';
import categoriesService from '../../services/categories.service.js';
import enrollService from '../../services/enroll.service.js';
import coursesService from '../../services/courses.service.js';

const HOT_CATEGORY_LIMIT = 5;
const HOT_COURSE_LIMIT = 12;
const NEW_COURSE_LIMIT = 12;

export default {
  // [GET] /home
  async showHome(req, res) {
    let length = 0;
    // categories
    // let categoriesList = await categoriesService.findAll();
    // const date = new Date().toISOString().slice(0, 10);
    // const dateMin7 = new Date(new Date().setDate(new Date().getDate() - 7))
    //   .toISOString()
    //   .slice(0, 10);
    // const enroll = await enrollService.countByCourseIdWithDate({
    //   start: dateMin7,
    //   end: date
    // });

    // categoriesList = categoriesList.map((category) => {
    //   if (category.parent_category_id) {
    //     category.enrollCount = 0;
    //     return category;
    //   }
    //   category.child_categories = [];
    //   return category;
    // });

    // length = enroll.length;
    // for (let i = 0; i < length; i++) {
    //   const course = await coursesService.findById(enroll[i].course_id);
    //   const cat = categoriesList.find((category) => {
    //     return category.id == course[0].category_id;
    //   });
    //   cat.enrollCount += enroll[i].counts;
    // }

    // categoriesList.sort((c1, c2) => {
    //   if (c1.enrollCount === undefined) return 1;
    //   if (c2.enrollCount === undefined) return -1;
    //   return c2.enrollCount - c1.enrollCount;
    // });

    // length = categoriesList.length;
    // for (let i = 0; i < length; i++) {
    //   if (categoriesList[i].enrollCount == 0) break;
    //   categoriesList[i].hot = true;
    //   categoriesList[
    //     categoriesList.findIndex(
    //       (category) => category.id === categoriesList[i].parent_category_id
    //     )
    //   ].hot = true;
    //   if (i >= HOT_CATEGORY_LIMIT) break;
    // }

    // while (categoriesList[0].parent_category_id) {
    //   categoriesList[
    //     categoriesList.findIndex(
    //       (category) => category.id === categoriesList[0].parent_category_id
    //     )
    //   ].child_categories.push(categoriesList[0]);
    //   categoriesList.shift();
    // }

    const hotCategoriesList = [...res.locals.lcCategories];
    while (!hotCategoriesList[0].parent_category_id) {
      const categories = hotCategoriesList[0].child_categories;
      categories.forEach((cat) => {
        if (cat.hot) hotCategoriesList.push(cat);
      });
      hotCategoriesList.shift();
    }

    // categories -end

    // hot course
    const coursesEnrollCount = await enrollService.countByCourseId(
      HOT_COURSE_LIMIT
    );

    const hotCourses = [];

    length = coursesEnrollCount.length;
    for (let i = 0; i < length; i++) {
      const course = await coursesService.findById(
        coursesEnrollCount[i].course_id
      );
      await formatUtils.courseCardFormat(course[0]);
      course[0].hot = true;
      hotCourses.push(course[0]);
    }
    // hot course -end

    // new course
    const newCourses = await coursesService.findAllWithDate(
      'desc',
      NEW_COURSE_LIMIT
    );

    let bestSellerId = await coursesService.getBestSellerId(HOT_COURSE_LIMIT);
    bestSellerId = bestSellerId.map((obj) => obj.id);

    length = newCourses.length;
    for (let i = 0; i < length; i++) {
      if (bestSellerId.includes(newCourses[i].id)) newCourses[i].hot = true;
      formatUtils.courseCardFormat(newCourses[i]);
    }
    // new course -end

    res.render('home', {
      hotCategories: hotCategoriesList,
      hotCourses: hotCourses,
      newCourses: newCourses
    });
  }
};
