import exampleRouter from './example.route.js';

export default function route(app) {
  app.use('/example', exampleRouter);
}
