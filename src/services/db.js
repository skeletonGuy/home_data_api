const mysql = require('mysql2/promise');
const config = require('../../config.js');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  let response, fields;
  try {
    [response, fields] = await connection.execute(sql, params);
  } catch(error) {
    throw new Error(error);
  }

  return [response, fields];
}

module.exports = {
  query
};
