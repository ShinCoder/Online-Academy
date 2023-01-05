import formatUtils from '../../utils/format.js';
import multer from 'multer';
import path from 'path';
import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';
import slugger from '../../utils/slug.js';

const HOT_COURSE_LIMIT = 12;

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
      }
      catch (error) {
        console.log("Add course error: ", error);
        //render fail screen here
      }
    });
  },

  async renderCreateChapter(req, res) {
    const courseId = req.params.id;

    const course = await coursesService.findById(courseId);

    const chapters = await coursesService.findAllChapterOfCourse(courseId);

    const category = await categoriesService.findByIdNotGetParent(course[0]?.category_id);

    const newAllChapters = await Promise.all(chapters.map(async (item) => {
      const allLessonsOfThisChapter = await coursesService.findAllLessonOfChapter(item?.id)

      return ({
        ...item,
        lessons: [...allLessonsOfThisChapter].map((item) => ({
          ...item,
          courseId: req.params.id
        }))
      })
    }))

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
    }

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

      res.redirect(`/courses/${courseId}/chapters/${returningResult[0]}/lessons/create`);
    }
    catch (error) {
      console.log("Add chapter error");
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
        chapter: chapter[0],
      });

    }
    catch (err) {
      console.log("Update status error: ", err)
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

        res.redirect(`/courses/${courseId}/chapters/${chapterId}/lessons/create`);
      }
      catch (err) {
        console.log("Update status error: ", err)
      }

    })
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
    }
    catch (err) {
      console.log("Update status error: ", err)
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

    }
    catch (err) {
      console.log("Update status error: ", err)
    }
  },

  async renderUpdateCourse(req, res) {
    const allCategories = await categoriesService.findAllNotGetParent();
    const thisCourse = await coursesService.findById(req.params.id);

    if (thisCourse && thisCourse.length) {
      const category = await categoriesService.findByIdNotGetParent(thisCourse[0]?.category_id);

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
      }

      res.render('courses/updateCourse', {
        categories: allCategories,
        course: { ...courseFormat }
      });

      req.session.updateCourse = { ...courseFormat }
    }
    else {
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
        const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: "uploadCourseBannerInput", maxCount: 1
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
        banner_filename: bannerName || req.session.updateCourse?.uploadCourseBanner,
        category_id: Number(req.body.courseCategory) || req.session.updateCourse?.courseCategoryId,
        short_description: req.body.shortDescription,
        detail_description: req.body.detailDescription,
        syllabus: req.body.syllabusDescription,
        price: Number(req.body.coursePrice),
        slug: slug
      }

      try {
        const courseId = req.params.id;

        const returningResult = await coursesService.updateCourse(req.params.id, resultCourse);

        const category = await categoriesService.findByIdNotGetParent(resultCourse.category_id);

        req.session.updateCourse = {
          id: Number(req.params.id),
          name: req.body.courseTitle,
          courseCategory: category[0].name,
          shortDescription: req.body.shortDescription,
          detailDescription: req.body.detailDescription,
          uploadCourseBanner: bannerName || req.session.updateCourse?.uploadCourseBanner,
          syllabus: req.body.syllabusDescription,
          price: String(req.body.coursePrice),
        }

        res.redirect(`/courses/${req.params.id}/chapters/update`);
      }
      catch (error) {
        console.log("Update course error: ", error);
        //render fail screen here
      }
    })
  },

  async renderUpdateChapter(req, res) {
    const courseId = req.params.id;
    const chapterId = req.params.chapterId;
    try {
      const returningResult = await coursesService.findAllChapterOfCourse(courseId);

      const course = await coursesService.findById(courseId);


      const category = await categoriesService.findByIdNotGetParent(course[0].category_id);

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
      }

      const newAllChapters = await Promise.all(returningResult.map(async (item) => {
        const allLessonsOfThisChapter = await coursesService.findAllLessonOfChapter(item?.id)

        return ({
          ...item,
          lessons: [...allLessonsOfThisChapter].map((item) => ({
            ...item,
            courseId: req.params.id
          }))
        })
      }))

      res.render('courses/updateChapter', {
        ...courseData,
        chapters: [...newAllChapters]
      });

    }
    catch (err) {
      console.log("Update status error: ", err)
    }
  },


  async updateLesson(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: "uploadLessonVideo", maxCount: 1
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
          })
        }
        else {
          const lessonReturn = await coursesService.updateLesson(lessonId, {
            title: req.body.lessonTitle,
            description: req.body.lessonDescription,
          })
        }

        res.redirect(`/courses/${courseId}/chapters/update`);
      }
      catch (error) {
        console.log("Update course error: ", error);
        //render fail screen here
      }
    })
  },

  async updateChapter(req, res) {
    const chapterId = req.params.chapterId;
    const courseId = req.params.id;

    try {

      const chapterReturn = await coursesService.updateChapter(chapterId, {
        title: req.body.chapterEachTitle
      });

      res.redirect(`/courses/${courseId}/chapters/update`);

    }
    catch (err) {
      console.log("Update status error: ", err)
    }
  },

  async postChapterOnUpdate(req, res) {
    const courseId = req.params.id;

    try {

      const chapterReturn = await coursesService.addChapter({
        title: req.body.chapterTitle,
        course_id: courseId
      });

      res.redirect(`/courses/${courseId}/chapters/${chapterReturn[0]}/lessons/create-on-update`);

    }
    catch (err) {
      console.log("Update status error: ", err)
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
        chapter: chapter[0],
      });

    }
    catch (err) {
      console.log("Update status error: ", err)
    }
  },

  async createLessonOnUpdate(req, res) {
    let bannerName;

    const storageBannerImage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: "uploadLessonVideo", maxCount: 1
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

        res.redirect(`/courses/${courseId}/chapters/${chapterId}/lessons/create-on-update`);
      }
      catch (err) {
        console.log("Update status error: ", err)
      }

    })
  },

  async showByCategory(req, res) {
    const category = await categoriesService.findBySlug(req.params.slug);

    let categoryId = [];

    if (!category[0].parent_category_id) {
      const categories = await categoriesService.findByParentId(category[0].id);
      categories.forEach((cat) => categoryId.push(cat.id));
    } else {
      categoryId.push(category[0].id);
    }

    const order = [];
    let sortRatingTop = false;
    let sortDateNew = false;
    let sortDateOld = false;
    let sortPriceExp = false;
    let sortPriceCheap = false;
    let sortPurchasedMost = false;
    let sortPurchasedLeast = false;

    const query = { ...req.query };

    if (query.sortRating) {
      order.push({
        column: 'rating_point',
        order: query.sortRating == 'Top' ? 'desc' : 'acs'
      });
      sortRatingTop = query.sortRating == 'Top' ? 'true' : 'false';
    }

    if (query.sortDate) {
      order.push({
        column: 'created_at',
        order: query.sortDate == 'NewToOld' ? 'desc' : 'acs'
      });
    }

    if (query.sortPrice) {
      order.push({
        column: 'price',
        order: query.sortPrice == 'MostExpensive' ? 'desc' : 'acs'
      });
    }

    if (query.sortPurchased) {
      order.push({
        column: 'purchased_count',
        order: query.sortPurchased == 'MostPurchased' ? 'desc' : 'acs'
      });
    }

    let courses;

    if (order) {
      courses = await coursesService.findAllAndRatingByCategory(
        categoryId,
        order
      );
    } else {
      courses = await coursesService.findAllAndRatingByCategory(categoryId);
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
      category: category[0]
    });
  }
};
