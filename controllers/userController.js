import { check, validationResult } from 'express-validator';
import User from '../models/User.js';

const formLogin = (req, res) => {
	res.render('auth/login', {
		page: 'Login',
	});
};

const formSignUp = (req, res) => {
	res.render('auth/signup', {
		page: 'Create Account',
	});
};

const register = async (req, res) => {
	// Validation
	await check('name')
		.notEmpty()
		.withMessage('The name cannot be empty')
		.run(req);
	await check('email').isEmail().withMessage('The email is not valid').run(req);
	await check('password')
		.isLength({ min: 6 })
		.withMessage('The password must have a minimum of 6 characters')
		.run(req);
	await check('repeatPassword')
		.equals(req.body.password)
		.withMessage('The passwords are not the same')
		.run(req);

	// Errors are stored as a result
	// If result is empty there are no errors
	const hasErrors = validationResult(req);

	console.log(req.body.password);
	console.log(req.body.repeatPassword);
	// If error is not empty show error
	if (!hasErrors.isEmpty()) {
		// Render the same page to show the errors
		return res.render('auth/signup', {
			page: 'Create Account',
			errors: hasErrors.array(),
			user: {
				name: req.body.name,
				email: req.body.email,
			},
		});
	}

	const user = await User.create(req.body);

	res.json(user);
};

const formResetPassword = (req, res) => {
	res.render('auth/reset-password', {
		page: 'Recover password',
	});
};

export { formLogin, formSignUp, formResetPassword, register };
