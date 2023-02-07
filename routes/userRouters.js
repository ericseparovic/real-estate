import express from 'express';
import { formLogin } from '../controllers/userController';

const router = express.Router();

// Routine
router.get('/login', formLogin);
router.get('register');

export default router;
