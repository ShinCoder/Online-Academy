import formatUtils from '../../utils/format.js';
import multer from 'multer';
import path from 'path';
import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';
import slugger from '../../utils/slug.js';

const HOT_COURSE_LIMIT = 12;
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

export default {
  async renderCreateCourse(req, res) {
    const allCategories = await categoriesService.findAll();

    res.render('courses/createCourse', {
      categories: allCategories
    });
  },

  renderCreateChapter(req, res) {
    res.render('courses/createChapter');
  },

  renderCreateLesson(req, res) {
    res.render('courses/createLesson');
  },

  async postCourse(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/images/courses');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname); // +  "- ${teacherId}"
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

        const category = await categoriesService.findById(
          req.body.courseCategory
        );

        req.session.createCourse = {
          id: returningResult[0],
          name: req.body.courseTitle,
          courseCategory: category[0].name,
          shortDescription: req.body.shortDescription,
          detailDescription: req.body.detailDescription,
          uploadCourseBanner: bannerName,
          syllabus: req.body.syllabusDescription,
          price: String(req.body.coursePrice),
          chapters: []
        };

        res.render('courses/createChapter');
      } catch (error) {
        console.log('Add course error: ', error);
        //render fail screen here
      }
    });
  },

  async postChapter(req, res) {
    const resultChapter = {
      course_id: req.session.createCourse.id,
      title: req.body.chapterTitle
    };

    try {
      const returningResult = await coursesService.addChapter(resultChapter);

      req.session.createCourse = {
        ...req.session.createCourse,
        currentChapterIdSelect: returningResult[0],
        currentChapterTitleSelect: req.body.chapterTitle,
        chapters: [
          ...req.session.createCourse?.chapters,
          {
            id: returningResult[0],
            chapterTitle: req.body.chapterTitle,
            lessons: []
          }
        ]
      };

      res.render('courses/createLesson');
    } catch (error) {
      console.log('Add chapter error');
    }
  },

  async postLesson(req, res) {
    let bannerName;

    const storageBannerVideo = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename =
          file.fieldname + '_' + Date.now() + path.extname(file.originalname); // +  "- ${teacherId}"
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerVideo });

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

      const resultLesson = {
        chapter_id: req.session.createCourse.currentChapterIdSelect,
        video_filename: bannerName,
        title: req.body.lessonTitle,
        description: req.body.lessonDescription
      };

      const pushResult = {
        chapter_id: req.session.createCourse.currentChapterIdSelect,
        video_filename: bannerName,
        title: req.body.lessonTitle,
        description: req.body.lessonDescription,
        chapterTitle: req.session.createCourse.currentChapterTitleSelect
      };

      try {
        const returningResult = await coursesService.addLesson(resultLesson);

        req.session.createCourse.chapters[
          req.session.createCourse.chapters.length - 1
        ].lessons.push(pushResult);

        res.render('courses/createLesson');
      } catch (error) {
        console.log('Add lesson fail: ', error);
      }
    });
  },

  async updateCourseStatus(req, res) {
    const courseId = req.params.id;

    try {
      const returningResult = await coursesService.updateStatus(
        courseId,
        req.body?.checkFinishCourse ? true : false
      );
      req.session.createCourse = null;

      const allCategories = await categoriesService.findAll();

      res.render('courses/createCourse', {
        categories: allCategories
      });
    } catch (err) {
      console.log('Update status error: ', err);
    }

    //res.render('courses');
  },

  // courses/category/:slug
  async showByCategory(req, res) {
    const category = await categoriesService.findBySlug(req.params.slug);

    let categoryId = [];

    if (!category[0].parent_category_id) {
      const categories = await categoriesService.findByParentId(category[0].id);
      categories.forEach((cat) => categoryId.push(cat.id));
    } else {
      categoryId.push(category[0].id);
    }

    // pagination
    const courseCount = await coursesService.countByCategoryId(categoryId);
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

    let bestSellerId = await coursesService.getBestSellerId(HOT_COURSE_LIMIT);
    bestSellerId = bestSellerId.map((obj) => obj.id);

    courses.forEach((course) => {
      if (bestSellerId.includes(course.id)) {
        course.hot = true;
      }
      formatUtils.courseCardFormat(course);
    });

    res.render('courses/coursesView', {
      courses: courses,
      category: category[0],
      pagination
    });
  },

  // [POST] /courses/sortOrder
  setSortOrder(req, res) {
    const sortOrder = { ...req.body };

    req.session.viewSort = sortOrder;

    res.redirect('back');
  }
};
