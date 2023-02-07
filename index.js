import express from 'express';
import userRouters from './routes/userRouters.js';

// Create app
const app = express();

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
