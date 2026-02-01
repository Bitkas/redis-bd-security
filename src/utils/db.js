const mysql = require('mysql2/promise');

let connection;
const createConnection = async () => {

  if(connection) return connection
  return mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'mysqlDB',
    password: 'mysqlPW',
    port: 3306
  });
}

module.exports = { createConnection }