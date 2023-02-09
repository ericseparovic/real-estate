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

const formResetPassword = (req, res) => {
	res.render('auth/reset-password', {
		page: 'Recover password',
	});
};

export { formLogin, formSignUp, formResetPassword };
