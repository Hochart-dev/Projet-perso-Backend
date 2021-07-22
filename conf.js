const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD } = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_SCHEMA,
  password: DB_PASSWORD,
});

module.exports = { db: connection };
