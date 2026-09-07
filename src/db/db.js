const { Pool } = require('pg');

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

// CRITICAL: Listen for background errors on idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err.message);
  // node-postgres will automatically close and remove this bad client from the pool
});

module.exports = { pool };
