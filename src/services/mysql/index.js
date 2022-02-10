require("dotenv").config();
const mysql = require("mysql");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE } = require('../../config')

async function connectDB() {
  try {
    const con = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DATABASE,
    });
    console.log(`Database connected`);
    return con;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
};
