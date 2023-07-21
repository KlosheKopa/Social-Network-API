const express = require('express');
const connection = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connection.once('open', () => {
	console.log('Connected to MongoDB successfully!');
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	})
});

connection.on('error', err => {
	console.error('Could not connect to MongoDB because:', err);
});