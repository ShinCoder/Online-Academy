import express from 'express';
const router = express.Router();

import SeedController from '../app/controllers/seed.controller.js';

router.get('/all', SeedController.seedAll);

export default router;
