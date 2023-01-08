import exampleRouter from './example.routes.js';
import siteRouter from './site.routes.js';
import seedRouter from './seed.routes.js';
import coursesRouter from './courses.routes.js';
import categoriesRouter from './categories.routes.js';
import lecturersRouter from './lecturers.routes.js';
import adminRouter from './admin.routes.js';
import authRouter from './auth.routes.js';

export default function route(app) {
  app.use('/example', exampleRouter);

  app.use('/seed', seedRouter);

  app.use('/courses', coursesRouter);

  app.use('/categories', categoriesRouter);

  app.use('/lecturers', lecturersRouter);

  app.use('/admin', adminRouter);
  
  app.use('/auth', authRouter);

  app.use('/', siteRouter);
}
