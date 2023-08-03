const mysql = require("mysql");

const connection = mysql.createPool({
  host: "mysql.cxvwtaworrna.sa-east-1.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "app_bancario",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  databaseConection: connection,
  executeQuery: (query, params = []) => {
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        params,
        (err, result) => {
          return err ? reject(err) : resolve(result);
        }
      );
    });
  },
};
