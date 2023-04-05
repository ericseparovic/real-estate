import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const { email, name, token } = data;

	// Send email
	await transport.sendMail({
		from: 'Real Estate',
		to: email,
		subject: 'Confirm your account',
		text: 'Confirm your account',
		html: `<p>Hello ${name}, validate your account</p>
                <a href="${process.env.BACKEND_URL}:${
			process.env.PORT ?? 3000
		}/auth/confirmed/${token}">Click</a>
        
        
        
        `,
	});
};

export { registerEmail };
