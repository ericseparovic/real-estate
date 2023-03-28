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
	const user = await User.create(req.body);
	res.json(user);
};

const formResetPassword = (req, res) => {
	res.render('auth/reset-password', {
		page: 'Recover password',
	});
};

export { formLogin, formSignUp, formResetPassword, register };
