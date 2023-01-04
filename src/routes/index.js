import exampleRouter from './example.routes.js';
import siteRouter from './site.routes.js';
import seedRouter from './seed.routes.js';
import coursesRouter from './courses.routes.js';
import categoriesRouter from './categories.routes.js';

export default function route(app) {
  app.use('/example', exampleRouter);

  app.use('/seed', seedRouter);

  app.use('/courses', coursesRouter);

  app.use('/categories', categoriesRouter);

  app.use('/', siteRouter);
}
