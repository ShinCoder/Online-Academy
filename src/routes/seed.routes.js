import express from 'express';
const router = express.Router();

import SeedController from '../app/controllers/seed.controller.js';

router.get('/all', SeedController.seedAll);

router.get('/enroll', SeedController.seedEnroll);

router.get('/categories', SeedController.seedCategories);

export default router;
