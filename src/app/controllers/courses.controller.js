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
    let videoFieldNames = [];

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
      ...videoFields,
      {
        name: "uploadCourseBannerInput", maxCount: 1
      }
    ])(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
      } else if (err) {
        console.error(err);
      }

      console.log("second: ", {
        ...req.body,
        allChapter: JSON.parse(req.body.allChapter),
        uploadCourseBanner: bannerName
      });
      res.render('courses/createCourse');

    })
  }
};  