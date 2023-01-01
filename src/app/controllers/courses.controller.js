import multer from 'multer';
import path from 'path';
import categoriesService from '../../services/categories.service.js';
import coursesService from '../../services/courses.service.js';

export default {
  renderCreateCourse(req, res) {
    res.render('courses/createCourse');
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
        const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname); // +  "- ${teacherId}"
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerImage });

    upload.fields([
      {
        name: "uploadCourseBannerInput", maxCount: 1
      }
    ])(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      console.log("Result: ", {
        ...req.body,
        uploadCourseBanner: bannerName
      });

      req.session.createCourse = {
        id: 1,
        name: req.body.courseTitle,
        courseCategory: req.body.courseCategory,
        shortDescription: req.body.shortDescription,
        uploadCourseBanner: bannerName,
        chapters: []
      }

      res.render('courses/createChapter');
    })
  },

  async postChapter(req, res) {
    console.log("Chapter: ", req.body);
    req.session.createCourse = {
      ...req.session.createCourse,
      chapters: [...req.session.createCourse?.chapters, {
        id: req.session.createCourse?.chapters.length || 0 + 1,
        chapterTitle: req.body.chapterTitle,
        lessons: []
      }]
    }
    res.render('courses/createLesson', {
      chapterId: req.session.createCourse?.chapters.length || 0 + 1,
      chapterTitle: req.body.chapterTitle
    });
  },

  async postLesson(req, res) {
    let bannerName;

    const storageBannerVideo = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/public/videos/lessons');
      },
      filename: function (req, file, cb) {
        const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname); // +  "- ${teacherId}"
        bannerName = filename;
        cb(null, filename);
      }
    });
    const upload = multer({ storage: storageBannerVideo });

    upload.fields([
      {
        name: "uploadLessonVideo", maxCount: 1
      }
    ])(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      const result = {
        ...req.body,
        uploadLessonVideo: bannerName
      };

      req.session.createCourse.chapters[req.session.createCourse.chapters.length - 1].lessons.push(result);

      console.log("req.session.createCourse: ", req.session.createCourse.chapters[0].lessons)

      res.render('courses/createLesson');
    })
  },

  async showByCategory(req, res) {
    const category = await categoriesService.findBySlug(req.params.slug);
    const courses = await coursesService.findByCategoryId(category[0].id);

    res.render('courses');
  }

};  
