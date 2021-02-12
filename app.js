const express = require('express');
const fs = require('fs');
const path = require('path');

const host = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	console.log("hehe cvringe");
	console.log(req.query.req1);
	console.log(req.query.req2);
	res.render('index', {
		title: "Undirskriftarlisti"
	});
});

app.post('/', (req,res) => {
	res.send(`${req.body}`);
	console.log("hehe");
});

app.listen(port,host,() => {
	console.log(
	`server @ http://${host}:${port}`,
	);
});

