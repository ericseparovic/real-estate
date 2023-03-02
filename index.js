import express from 'express';
import userRouters from './routes/userRouters.js';
import db from './config/db.js';

// Create app
const app = express();

// Conection db
db.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch((error) => console.error('Unable to connect to the database:', error));

// Enable pug
app.set('view engine', 'pug');
app.set('views', './views');

// Folder Public - File static
app.use(express.static('./public'));

// Routing
app.use('/auth', userRouters);

// Define port and start the app
const port = 3000;
app.listen(port, () => {
	console.log('listen port', port);
});
