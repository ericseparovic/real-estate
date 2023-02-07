import express from 'express';

const router = express.Router();

// Routine
router.get('/login', function (req, res) {
	res.render('auth/login', {
		auth: false,
	});
});

export default router;
