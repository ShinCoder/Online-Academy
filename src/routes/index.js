import authRouter from './auth.route.js';

export default function route(app) {
  app.use('/auth', authRouter);
}
