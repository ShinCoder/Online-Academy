import formatUtils from '../../utils/format.js';
import multer from 'multer';
import path from 'path';
import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';
import slugger from '../../utils/slug.js';

const HOT_COURSE_LIMIT = 12;
const NEW_COURSE_DURATION = 30;
const NEW_COURSE_LIMIT = 30;
const COURSES_PAGE_LIMIT = 12;

const getPagination = (currentPage, lastPage) => {
  const pagination = [];
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) {
      pagination.push({
        value: i,
        isCurrent: i === currentPage
      });
    }
  } else {
    if (currentPage <= 3) {
      pagination.push({
        value: 1,
        isCurrent: currentPage === 1 ? true : false
      });
      pagination.push({
        value: 2,
        isCurrent: currentPage === 2 ? true : false
      });
      pagination.push({
        value: 3,
        isCurrent: currentPage === 3 ? true : false
      });
      pagination.push({
        value: 4,
        isCurrent: false
      });
      pagination.push({
        value: '...',
        isDisabled: true
      });
      pagination.push({
        value: lastPage,
        isCurrent: false
      });
    } else if (currentPage >= lastPage - 2) {
      pagination.push({
        value: 1,
        isCurrent: false
      });
      pagination.push({
        value: '...',
        isDisabled: true
      });
      pagination.push({
        value: lastPage - 3,
        isCurrent: false
      });
      pagination.push({
        value: lastPage - 2,
        isCurrent: currentPage === lastPage - 2 ? true : false
      });
      pagination.push({
        value: lastPage - 1,
        isCurrent: currentPage === lastPage - 1 ? true : false
      });
      pagination.push({
        value: lastPage,
        isCurrent: currentPage === lastPage ? true : false
      });
    } else {
      pagination.push({
        value: 1,
        isCurrent: false
      });
      pagination.push({
        value: '...',
        isDisabled: true
      });
      pagination.push({
        value: currentPage - 1,
        isCurrent: false
      });
      pagination.push({
        value: currentPage,
        isCurrent: true
      });
      pagination.push({
        value: currentPage + 1,
        isCurrent: false
      });
      pagination.push({
        value: '...',
        isDisabled: true
      });
      pagination.push({
        value: lastPage,
        isCurrent: false
      });
    }
  }
  return pagination;
};

export const specifyCourses = async (courses) => {
  let bestSellerId = await coursesService.getBestSellerId(HOT_COURSE_LIMIT);
  bestSellerId = bestSellerId.map((obj) => obj.id);

  const dateEnd = new Date().toISOString().slice(0, 10);
  const dateStart = new Date(
    new Date().setDate(new Date().getDate() - NEW_COURSE_DURATION)
  )
    .toISOString()
    .slice(0, 10);

  let newestId = await coursesService.getNewestId(
    {
      start: dateStart,
      end: dateEnd
    },
    NEW_COURSE_LIMIT
  );
  newestId = newestId.map((obj) => obj.id);

  courses.forEach((course) => {
    if (bestSellerId.includes(course.id) && newestId.includes(course.id)) {
      course.special = {
        isSpecial: true,
        value: 'New and Best Seller'
      };
    } else if (bestSellerId.includes(course.id)) {
      course.special = {
        isSpecial: true,
        value: 'Best Seller'
      };
    } else if (newestId.includes(course.id)) {
      course.special = {
        isSpecial: true,
        value: 'New'
      };
    }
  });
};

export default {
  async renderCreateCourse(req, res) {
    const allCategories = await categoriesService.findAllNotGetParent();

    res.render('courses/createCourse', {
      categories: allCategories
    });
  },

  async postCourse(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/images/courses');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: 'uploadCourseBannerInput',
        maxCount: 1
      }
    ])(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      const slug = await slugger.getCourseUniqueSlug(req.body.courseTitle);

      const resultCourse = {
        name: req.body.courseTitle,
        lecturer_id: req.session?.user?.id || 3, // [FIX] Replace by auth user
        banner_filename: bannerName,
        category_id: Number(req.body.courseCategory),
        short_description: req.body.shortDescription,
        detail_description: req.body.detailDescription,
        syllabus: req.body.syllabusDescription,
        is_completed: false,
        price: Number(req.body.coursePrice),
        slug: slug
      };

      try {
        const returningResult = await coursesService.add(resultCourse);

        res.redirect(`/courses/${returningResult[0]}/chapters/create`);
      } catch (error) {
        console.log('Add course error: ', error);
        //render fail screen here
      }
    });
  },

  async renderCreateChapter(req, res) {
    const courseId = req.params.id;

    const course = await coursesService.findById(courseId);

    const chapters = await coursesService.findAllChapterOfCourse(courseId);

    const category = await categoriesService.findByIdNotGetParent(
      course[0]?.category_id
    );

    const newAllChapters = await Promise.all(
      chapters.map(async (item) => {
        const allLessonsOfThisChapter =
          await coursesService.findAllLessonOfChapter(item?.id);

        return {
          ...item,
          lessons: [...allLessonsOfThisChapter].map((item) => ({
            ...item,
            courseId: req.params.id
          }))
        };
      })
    );

    const courseData = {
      courseId: course[0].id,
      courseName: course[0].name,
      courseBannerFileName: course[0].banner_filename,
      courseCategory: category[0].name,
      coursePrice: course[0].price,
      courseIsCompleted: course[0].is_completed ? true : false,
      courseShortDescription: course[0].short_description,
      courseDetailDescription: course[0].detail_description,
      courseSyllabus: course[0].syllabus
    };

    res.render('courses/createChapter', {
      ...courseData,
      chapters: [...newAllChapters]
    });
  },

  async postChapter(req, res) {
    const courseId = req.params.id;

    const resultChapter = {
      course_id: courseId,
      title: req.body.chapterTitle
    };

    try {
      const returningResult = await coursesService.addChapter(resultChapter);

      res.redirect(
        `/courses/${courseId}/chapters/${returningResult[0]}/lessons/create`
      );
    } catch (error) {
      console.log('Add chapter error');
    }
  },

  async renderCreateLesson(req, res) {
    const courseId = req.params.id;
    const chapterId = req.params.chapterId;
    try {
      const course = await coursesService.findById(courseId);
      const chapter = await coursesService.getChapterById(chapterId);

      res.render('courses/createLesson', {
        course: course[0],
        chapter: chapter[0]
      });
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async postLesson(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: 'uploadLessonVideo',
        maxCount: 1
      }
    ])(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      const courseId = req.params.id;
      const chapterId = req.params.chapterId;
      try {
        const lessonReturn = await coursesService.addLesson({
          title: req.body.lessonTitle,
          description: req.body.lessonDescription,
          video_filename: bannerName,
          chapter_id: chapterId
        });

        res.redirect(
          `/courses/${courseId}/chapters/${chapterId}/lessons/create`
        );
      } catch (err) {
        console.log('Update status error: ', err);
      }
    });
  },

  async showByCategory(req, res) {
    const category = await categoriesService.findBySlug(req.params.slug);
    const courses = await coursesService.findByCategoryId(category[0].id);

    res.render('courses');
  },

  async updateCourseStatus(req, res) {
    const courseId = req.params.id;

    try {
      const returningResult = await coursesService.updateStatus(
        courseId,
        req.body?.checkFinishCourse ? true : false
      );

      res.redirect('/courses/create');
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async renderUpdateLesson(req, res) {
    const courseId = req.params.id;
    const chapterId = req.params.chapterId;
    const lessonId = req.params.lessonId;

    try {
      const lesson = await coursesService.getLessonById(lessonId);

      if (lesson.length) {
        res.render('courses/updateLesson', {
          ...lesson[0],
          courseId,
          chapterId,
          lessonId
        });
      }
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async renderUpdateCourse(req, res) {
    const allCategories = await categoriesService.findAllNotGetParent();
    const thisCourse = await coursesService.findById(req.params.id);

    if (thisCourse && thisCourse.length) {
      const category = await categoriesService.findByIdNotGetParent(
        thisCourse[0]?.category_id
      );

      const courseFormat = {
        id: thisCourse[0]?.id,
        name: thisCourse[0]?.name,
        courseCategory: category[0].name,
        courseCategoryId: category[0].id,
        shortDescription: thisCourse[0].short_description,
        detailDescription: thisCourse[0].detail_description,
        uploadCourseBanner: thisCourse[0].banner_filename,
        syllabus: thisCourse[0].syllabus,
        price: String(thisCourse[0].price)
      };

      res.render('courses/updateCourse', {
        categories: allCategories,
        course: { ...courseFormat }
      });

      req.session.updateCourse = { ...courseFormat };
    } else {
      //redirect
    }
  },

  async updateCourse(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/images/courses');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: 'uploadCourseBannerInput',
        maxCount: 1
      }
    ])(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      const slug = await slugger.getCourseUniqueSlug(req.body.courseTitle);

      const resultCourse = {
        name: req.body.courseTitle,
        banner_filename:
          bannerName || req.session.updateCourse?.uploadCourseBanner,
        category_id:
          Number(req.body.courseCategory) ||
          req.session.updateCourse?.courseCategoryId,
        short_description: req.body.shortDescription,
        detail_description: req.body.detailDescription,
        syllabus: req.body.syllabusDescription,
        price: Number(req.body.coursePrice),
        slug: slug
      };

      try {
        const courseId = req.params.id;

        const returningResult = await coursesService.updateCourse(
          req.params.id,
          resultCourse
        );

        const category = await categoriesService.findByIdNotGetParent(
          resultCourse.category_id
        );

        req.session.updateCourse = {
          id: Number(req.params.id),
          name: req.body.courseTitle,
          courseCategory: category[0].name,
          shortDescription: req.body.shortDescription,
          detailDescription: req.body.detailDescription,
          uploadCourseBanner:
            bannerName || req.session.updateCourse?.uploadCourseBanner,
          syllabus: req.body.syllabusDescription,
          price: String(req.body.coursePrice)
        };

        res.redirect(`/courses/${req.params.id}/chapters/update`);
      } catch (error) {
        console.log('Update course error: ', error);
        //render fail screen here
      }
    });
  },

  async renderUpdateChapter(req, res) {
    const courseId = req.params.id;
    const chapterId = req.params.chapterId;
    try {
      const returningResult = await coursesService.findAllChapterOfCourse(
        courseId
      );

      const course = await coursesService.findById(courseId);

      const category = await categoriesService.findByIdNotGetParent(
        course[0].category_id
      );

      const courseData = {
        courseId: course[0].id,
        courseName: course[0].name,
        courseBannerFileName: course[0].banner_filename,
        courseCategory: category[0].name,
        coursePrice: course[0].price,
        courseIsCompleted: course[0].is_completed ? true : false,
        courseShortDescription: course[0].short_description,
        courseDetailDescription: course[0].detail_description,
        courseSyllabus: course[0].syllabus
      };

      const newAllChapters = await Promise.all(
        returningResult.map(async (item) => {
          const allLessonsOfThisChapter =
            await coursesService.findAllLessonOfChapter(item?.id);

          return {
            ...item,
            lessons: [...allLessonsOfThisChapter].map((item) => ({
              ...item,
              courseId: req.params.id
            }))
          };
        })
      );

      res.render('courses/updateChapter', {
        ...courseData,
        chapters: [...newAllChapters]
      });
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async updateLesson(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: 'uploadLessonVideo',
        maxCount: 1
      }
    ])(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      try {
        const lessonId = req.params.lessonId;
        const chapterId = req.params.chapterId;
        const courseId = req.params.id;

        if (bannerName) {
          const lessonReturn = await coursesService.updateLesson(lessonId, {
            title: req.body.lessonTitle,
            description: req.body.lessonDescription,
            video_filename: bannerName
          });
        } else {
          const lessonReturn = await coursesService.updateLesson(lessonId, {
            title: req.body.lessonTitle,
            description: req.body.lessonDescription
          });
        }

        res.redirect(`/courses/${courseId}/chapters/update`);
      } catch (error) {
        console.log('Update course error: ', error);
        //render fail screen here
      }
    });
  },

  async updateChapter(req, res) {
    const chapterId = req.params.chapterId;
    const courseId = req.params.id;

    try {
      const chapterReturn = await coursesService.updateChapter(chapterId, {
        title: req.body.chapterEachTitle
      });

      res.redirect(`/courses/${courseId}/chapters/update`);
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async postChapterOnUpdate(req, res) {
    const courseId = req.params.id;

    try {
      const chapterReturn = await coursesService.addChapter({
        title: req.body.chapterTitle,
        course_id: courseId
      });

      res.redirect(
        `/courses/${courseId}/chapters/${chapterReturn[0]}/lessons/create-on-update`
      );
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async renderCreateLessonOnUpdate(req, res) {
    const courseId = req.params.id;
    const chapterId = req.params.chapterId;
    try {
      const course = await coursesService.findByIdNotGetParent(courseId);
      const chapter = await coursesService.getChapterById(chapterId);

      res.render('courses/createLessonOnUpdate', {
        course: course[0],
        chapter: chapter[0]
      });
    } catch (err) {
      console.log('Update status error: ', err);
    }
  },

  async createLessonOnUpdate(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: 'uploadLessonVideo',
        maxCount: 1
      }
    ])(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      const courseId = req.params.id;
      const chapterId = req.params.chapterId;
      try {
        const lessonReturn = await coursesService.addLesson({
          title: req.body.lessonTitle,
          description: req.body.lessonDescription,
          video_filename: bannerName,
          chapter_id: chapterId
        });

        res.redirect(
          `/courses/${courseId}/chapters/${chapterId}/lessons/create-on-update`
        );
      } catch (err) {
        console.log('Update status error: ', err);
      }
    });
  },

  // [GET] courses/category/:slug
  async showByCategory(req, res) {
    const category = await categoriesService.findBySlug(req.params.slug);

    res.locals.currentCategory = req.params.slug;

    let categoryId = [];

    if (!category[0].parent_category_id) {
      const categories = await categoriesService.findByParentId(category[0].id);
      categories.forEach((cat) => categoryId.push(cat.id));
    } else {
      categoryId.push(category[0].id);
    }

    // pagination
    const courseCount = await coursesService.countByCategory(categoryId);
    const lastPage = Math.ceil(courseCount[0].counts / COURSES_PAGE_LIMIT);
    let currentPage = +req.query.page || 1;
    if (currentPage > lastPage) currentPage = 1;
    if (currentPage < 1) currentPage = 1;
    const offset = (currentPage - 1) * COURSES_PAGE_LIMIT;

    const pagination = { pages: getPagination(currentPage, lastPage) };
    pagination.lastPage = lastPage;
    pagination.currentPage = currentPage;

    const order = [];

    if (res.locals.viewSort.sortRating) {
      order.push({
        column: 'rating_point',
        order: res.locals.viewSort.sortRating == 'Top' ? 'desc' : 'acs'
      });
    }

    if (res.locals.viewSort.sortDate) {
      order.push({
        column: 'created_at',
        order: res.locals.viewSort.sortDate == 'NewToOld' ? 'desc' : 'acs'
      });
    }

    if (res.locals.viewSort.sortPurchased) {
      order.push({
        column: 'purchased_count',
        order:
          res.locals.viewSort.sortPurchased == 'MostPurchased' ? 'desc' : 'acs'
      });
    }

    if (res.locals.viewSort.sortPrice) {
      order.push({
        column: 'price',
        order: res.locals.viewSort.sortPrice == 'MostExpensive' ? 'desc' : 'acs'
      });
    }

    let courses;

    if (order) {
      courses = await coursesService.findAllAndRatingByCategory(
        categoryId,
        COURSES_PAGE_LIMIT,
        offset,
        order
      );
    } else {
      courses = await coursesService.findAllAndRatingByCategory(
        categoryId,
        COURSES_PAGE_LIMIT,
        offset
      );
    }

    // let bestSellerId = await coursesService.getBestSellerId(HOT_COURSE_LIMIT);
    // bestSellerId = bestSellerId.map((obj) => obj.id);

    // courses.forEach((course) => {
    //   if (bestSellerId.includes(course.id)) {
    //     course.hot = true;
    //   }
    //   formatUtils.courseCardFormat(course);
    // });

    specifyCourses(courses);
    courses.forEach(
      async (course) => await formatUtils.courseCardFormat(course)
    );

    res.render('courses/coursesView', {
      courses: courses,
      title: {
        link: '/courses/category/' + category[0].slug,
        name: category[0].name
      },
      pagination
    });
  },

  // [POST] /courses/sortOrder
  setSortOrder(req, res) {
    const sortOrder = { ...req.body };

    req.session.viewSort = sortOrder;

    res.redirect('back');
  },

  // [POST] /courses/filter
  setFilter(req, res) {
    const filter = req.body;

    const viewFilter = Object.keys(filter).map((id) => +id) || undefined;

    if (viewFilter) {
      req.session.viewFilter = req.session.viewFilter.map((cat) => {
        if (viewFilter.includes(cat.id)) {
          cat.isFiltered = true;
        } else cat.isFiltered = false;
        return cat;
      });
    } else {
      req.session.viewFilter = req.session.viewFilter.map((cat) => {
        cat.isFiltered = false;
        return cat;
      });
    }

    res.redirect('back');
  },

  // [GET] /courses/search
  async showBySearch(req, res) {
    const query = { ...req.query };

    let courses, courseCount, lastPage, offset;

    let currentPage = +req.query.page || 1;
    if (currentPage > lastPage) currentPage = 1;
    if (currentPage < 1) currentPage = 1;

    const order = [];

    if (res.locals.viewSort.sortRating) {
      order.push({
        column: 'rating_point',
        order: res.locals.viewSort.sortRating == 'Top' ? 'desc' : 'acs'
      });
    }

    if (res.locals.viewSort.sortDate) {
      order.push({
        column: 'created_at',
        order: res.locals.viewSort.sortDate == 'NewToOld' ? 'desc' : 'acs'
      });
    }

    if (res.locals.viewSort.sortPurchased) {
      order.push({
        column: 'purchased_count',
        order:
          res.locals.viewSort.sortPurchased == 'MostPurchased' ? 'desc' : 'acs'
      });
    }

    if (res.locals.viewSort.sortPrice) {
      order.push({
        column: 'price',
        order: res.locals.viewSort.sortPrice == 'MostExpensive' ? 'desc' : 'acs'
      });
    }

    if (query.category) {
      const category = await categoriesService.findBySlug(query.category);
      let categoryId = [];

      res.locals.currentCategory = query.category;

      if (!category[0].parent_category_id) {
        const categories = await categoriesService.findByParentId(
          category[0].id
        );
        categories.forEach((cat) => categoryId.push(cat.id));
      } else {
        categoryId.push(category[0].id);
      }

      courseCount = await coursesService.countBySearchAndCategory(
        query.key,
        categoryId
      );
      lastPage = Math.ceil(courseCount[0].counts / COURSES_PAGE_LIMIT);
      offset = (currentPage - 1) * COURSES_PAGE_LIMIT;

      if (order) {
        courses = await coursesService.findAllAndRatingBySearchAndCategory(
          query.key,
          categoryId,
          COURSES_PAGE_LIMIT,
          offset,
          order
        );
      } else {
        courses = await coursesService.findAllAndRatingBySearchAndCategory(
          query.key,
          categoryId,
          COURSES_PAGE_LIMIT,
          offset
        );
      }
    } else if (req.session.viewFilter.find((cat) => cat.isFiltered == true)) {
      const categoryId = req.session.viewFilter
        .filter((cat) => {
          return cat.isFiltered;
        })
        .map((cat) => cat.id);

      courseCount = await coursesService.countBySearchAndCategory(
        query.key,
        categoryId
      );
      lastPage = Math.ceil(courseCount[0].counts / COURSES_PAGE_LIMIT);
      offset = (currentPage - 1) * COURSES_PAGE_LIMIT;

      if (order) {
        courses = await coursesService.findAllAndRatingBySearchAndCategory(
          query.key,
          categoryId,
          COURSES_PAGE_LIMIT,
          offset,
          order
        );
      } else {
        courses = await coursesService.findAllAndRatingBySearchAndCategory(
          query.key,
          categoryId,
          COURSES_PAGE_LIMIT,
          offset
        );
      }
    } else {
      courseCount = await coursesService.countBySearch(query.key);
      lastPage = Math.ceil(courseCount[0].counts / COURSES_PAGE_LIMIT);
      offset = (currentPage - 1) * COURSES_PAGE_LIMIT;

      if (order) {
        courses = await coursesService.findAllAndRatingBySearch(
          query.key,
          COURSES_PAGE_LIMIT,
          offset,
          order
        );
      } else {
        courses = await coursesService.findAllAndRatingBySearch(
          query.key,
          COURSES_PAGE_LIMIT,
          offset
        );
      }
    }

    specifyCourses(courses);

    courses.forEach(async (course) => {
      await formatUtils.courseCardFormat(course);
    });

    const pagination = { pages: getPagination(currentPage, lastPage) };
    pagination.lastPage = lastPage;
    pagination.currentPage = currentPage;

    res.render('courses/coursesView', {
      courses: courses,
      title: {
        link:
          '/courses/search?' +
          (query.category ? query.category + '&' : '') +
          'key=' +
          query.key,
        name: 'Search result: ' + query.key
      },
      pagination
    });
  }
};
