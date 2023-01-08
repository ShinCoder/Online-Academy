import express from 'express';
const router = express.Router();

import exampleController from '../app/controllers/example.controller.js';

router.get('/test', exampleController.exampleAction);

router.get('/err', function (req, res) {
  throw new Error('Something broke!');
});

router.get('/404', function (req, res) {
  res.status(404);
});

export default router;
