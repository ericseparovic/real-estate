import express from 'express';
import { formLogin, formSignUp } from '../controllers/userController.js';

const router = express.Router();

// Routine
router.get('/login', formLogin);
router.get('/signup', formSignUp);

export default router;
