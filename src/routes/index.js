import exampleRouter from './example.route.js';
import homeRouter from './home.route.js';

export default function route(app) {
  app.use('/example', exampleRouter);

  app.use('/', homeRouter);
}
