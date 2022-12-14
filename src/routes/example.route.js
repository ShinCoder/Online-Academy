import express from 'express';
const router = express.Router();

import exampleController from '../app/controllers/example.controller.js';

router.get('/test', exampleController.exampleAction);

export default router;
