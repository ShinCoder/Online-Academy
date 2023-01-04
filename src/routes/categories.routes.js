import express from 'express';
import categoriesController from '../app/controllers/categories.controller.js';

const router = express.Router();

router.get('/', categoriesController.showAll);

export default router;
