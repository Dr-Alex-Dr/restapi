const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost", // HOST NAME
    user: "root", // USER NAME
    database: "node_auth_api", // DATABASE NAME
    password: "root", // DATABASE PASSWORD
  });
  pool.query('select 1 + 1', (err, rows) => { 
      console.log('err' + err)
      console.log('rows' + rows);

   });
  

module.exports = pool;