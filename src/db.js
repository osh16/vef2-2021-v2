const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const {
  DATABASE_URL: connectionString,
  NODE_ENV: nodeEnv = 'development',
} = process.env;

//const connectionString = 'postgres://oskar:oskar@localhost/v2';

if (!connectionString) {
  console.error('Vantar DATABASE_URL');
  process.exit(1);
}

//ssl
const ssl = nodeEnv !== 'development' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
	console.error("cringe",err);
	process.exit(-1);
});

async function query(q, values = []) {
	const client = await pool.connect();
	console.log("query");
	try {
		const result = await client.query(q,values);
		console.log("try");
		return result.rows;
	} catch (e) {
		console.log("catch");
		return e;
		//throw(e);
	} finally {
		await client.release();
		//await client.end();
	}
}

async function insertSignature(data) {
	const q = `INSERT INTO signatures
			   (name,nationalId,comment,anonymous)
			   VALUES
			   ($1,$2,$3,$4)`;
	var values = [];
	if (data.anonymous === undefined) {
		values = [data.name, data.nationalId, data.comment, false ];
	} else {
		values = [data.name, data.nationalId, data.comment, data.anonymous ];
	}
	console.log("values:");
	console.log(values);
	return query(q,values);
}

async function getSignatures() { 
	const q = 'SELECT * FROM signatures';
	return query(q);
}

module.exports = { insertSignature, getSignatures };
