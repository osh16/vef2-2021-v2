const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const {
  DATABASE_URL: connectionString,
} = process.env;

//const connectionString = 'postgres://oskar:oskar@localhost/v2';

if (!connectionString) {
  console.error('Vantar DATABASE_URL');
  process.exit(1);
}

const pool = new pg.Pool({connectionString});

async function query(q, values = []) {
	const client = await pool.connect();
	try {
		const result = await client.query(q,values);
		return result.rows;
	} catch (e) {
		throw err;
	} finally {
		await client.end();
	}
}

async function insertSignature(data) {
	const q = `INSERT INTO signatures
			   (name,nationalId,comment,anonymous)
			   VALUES
			   ($1,$2,$3,$4)`;
	const values = [data.name, data.nationalId, data.comment, data.anonymous];
	return await query(q,values);
}

async function getSignatures() { 
	const q = 'SELECT * FROM signatures';
	return await query(q);
}

module.exports = { insertSignature, getSignatures };
