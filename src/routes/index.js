import exampleRouter from './example.routes.js';
import homeRouter from './home.routes.js';
import seedRouter from './seed.routes.js';

export default function route(app) {
  app.use('/example', exampleRouter);

  app.use('/seed', seedRouter);

  app.use('/', homeRouter);
}
