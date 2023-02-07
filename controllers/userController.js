const formLogin = (req, res) => {
	res.render('auth/login', {});
};

const formSignUp = (req, res) => {
	res.render('auth/signup', {});
};

export { formLogin, formSignUp };
