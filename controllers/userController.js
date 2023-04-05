import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { createId } from '../helpers/tokens.js';
import { registerEmail } from '../helpers/emails.js';

const formLogin = (req, res) => {
	res.render('auth/login', {
		page: 'Login',
	});
};

const formSignUp = (req, res) => {
	res.render('auth/signup', {
		page: 'Create Account',
		csrfToken: req.csrfToken(),
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

	// If error is not empty show error
	if (!hasErrors.isEmpty()) {
		// Render the same page to show the errors
		return res.render('auth/signup', {
			page: 'Create Account',
			csrfToken: req.csrfToken(),
			errors: hasErrors.array(),
			user: {
				name: req.body.name,
				email: req.body.email,
			},
		});
	}

	const { name, email, password } = req.body;

	// Verify that the user is not registered
	const hasUser = await User.findOne({ where: { email: req.body.email } });

	if (hasUser) {
		// Render the same page to show the errors
		return res.render('auth/signup', {
			page: 'Create Account',
			csrfToken: req.csrfToken(),
			errors: [{ msg: 'User is already registered' }],
			user: {
				name: req.body.name,
				email: req.body.email,
			},
		});
	}

	// Create user
	const user = await User.create({
		name,
		email,
		password,
		token: createId(),
	});

	// Send email confirmed
	registerEmail({
		name: user.name,
		email: user.email,
		token: user.token,
	});
	// Show confirmation message
	res.render('templates/message', {
		page: 'Account created successfully',
		message: 'We have sent an activation message to your email',
	});
};

const formResetPassword = (req, res) => {
	res.render('auth/reset-password', {
		page: 'Recover password',
	});
};

const confirmed = async (req, res, next) => {
	const { token } = req.params;

	// Verify that the token is valid
	const user = await User.findOne({ where: { token } });
	// If the token is not valid, it renders an error.
	if (!user) {
		return res.render('auth/confirmed.pug', {
			page: 'Confirmed Account',
			message: 'There was an error confirming your account',
			error: true,
		});
	}

	// If the token is valid, validate account
	// Delete token  and confirmed usar in local variables
	user.token = null;
	user.confirmed = true;

	// Save token and confirmed in db
	await user.save();

	// Show account validation confirmation
	return res.render('auth/confirmed.pug', {
		page: 'Confirmed Account',
		message: 'The account was confirmed successfully',
		error: false,
	});
	// next();
};

export { formLogin, formSignUp, formResetPassword, register, confirmed };
