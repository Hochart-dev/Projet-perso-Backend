const mysql = require('mysql2/promise');
require('dotenv').config();
const nodemailer = require('nodemailer');

const { DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD } = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_SCHEMA,
  password: DB_PASSWORD,
});

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = {
  db: connection,
  mailer: transporter,
};
