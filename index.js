import express from 'express';
import userRouters from './routes/userRouters.js';
import db from './config/db.js';

// Create app
const app = express();

// Allow read data form
app.use(express.urlencoded({ extended: true }));

// Conection db
try {
	await db.authenticate();
	console.log('Contection database.');
	db.sync();
} catch (error) {
	console.error('Error:', error);
}

// Enable pug
app.set('view engine', 'pug');
app.set('views', './views');

// Folder Public - File static
app.use(express.static('./public'));

// Routing
app.use('/auth', userRouters);

// Define port and start the app
const port = 3001;
app.listen(port, () => {
	console.log('listen port', port);
	console.log(`http://localhost:${port}/auth/signup`);
});
