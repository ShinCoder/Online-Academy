import coursesController from './courses.controller.js';

export default {
  // [GET] /home
  showHome(req, res) {
    coursesController.show();
    res.render('home');
  }
};
