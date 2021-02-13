const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const urlencodedParser = bodyParser.urlencoded({ extended: false})
const registration = require("./src/registration");
const dotenv = require("dotenv");

dotenv.config();

//const host = '127.0.0.1';
//const port = 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', registration);

const {
	PORT : port = 3000,
} = process.env;

app.listen(port,host,() => {
	console.log(
	`server @ http://localhost:${port}`,
	);
});

