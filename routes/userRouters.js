import express from 'express';
import {
	formLogin,
	formSignUp,
	formResetPassword,
	register,
} from '../controllers/userController.js';

const router = express.Router();

// Routine
router.get('/login', formLogin);
router.get('/signup', formSignUp);
router.post('/signup', register);
router.get('/reset-password', formResetPassword);

export default router;
