import express from 'express';
const router = express.Router();

import HomeController from '../app/controllers/home.controller.js';

router.get('/home', HomeController.showHome);

export default router;
