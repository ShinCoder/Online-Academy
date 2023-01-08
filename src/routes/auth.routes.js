import express from 'express';
const router = express.Router();

import authController from '../app/controllers/auth.controller.js';

router.get('/sign-in', authController.getSignIn);
router.post('/sign-in', authController.postSignIn);
router.get('/sign-up', authController.getSignUp);
router.post('/sign-up', authController.postSignUp);
router.get('/recovery-password', authController.getRecoveryPassword);
router.post('/recovery-password', authController.postRecoveryPassword);
router.get('/otp/:id', authController.getOtp);

export default router;
