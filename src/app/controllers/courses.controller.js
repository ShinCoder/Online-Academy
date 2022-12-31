import multer from 'multer';
import path from 'path';

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
        name: "Test course"
      }
      res.render('courses/createChapter', {
        courseTitle: req.body.courseTitle
      });
    })
  },

  async postChapter(req, res) {
    console.log("Chapter: ", req.body);
    res.render('courses/createLesson');
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

      console.log("Result: ", {
        ...req.body,
        uploadLessonVideo: bannerName
      });

      console.log("session test: ", req.session.createCourse)
      res.render('courses/createLesson');
    })
  }

};  