import express from 'express';
import methodOverride from 'method-override';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import activateRoute from './middlewares/route.mdw.js';
import activateViewEngine from './middlewares/views.mdw.js';
import activateSession from './middlewares/session.mdw.js';
import activate_resLocals from './middlewares/locals.mdw.js';
import categoriesService from './services/categories.service.js';
import enrollService from './services/enroll.service.js';
import coursesService from './services/courses.service.js';
const app = express();
// static path
app.use(express.static(__dirname + '/public'));
// body parser
app.use(
  express.urlencoded({
    extended: true
  })
);
// method override
app.use(methodOverride('_method'));

activateSession(app);
activate_resLocals(app);
activateRoute(app);
activateViewEngine(app, __dirname);

const PORT = 8080;
app.listen(PORT, function () {
  console.log(`Online Academy App listening at http://localhost:${PORT}`);
});
