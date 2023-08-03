const { databaseConection, executeQuery } = require("../conection");

exports.account = {
  async create(payload) {
    let query = "INSERT INTO app_bancario.account (balance, iduser) VALUES (?, ?);";
    const result = await executeQuery(query, [payload.balance, payload.iduser]);
    return result;
  },

  async update(payload) {
    let query = "UPDATE app_bancario.account SET balance = ? WHERE idaccount = ? ;";
    const result = await executeQuery(query, [
      payload.balance,
      payload.idaccount,
    ]);
    return result;
  },

  async read(name) {
    const where = `WHERE name = "${name}"`;
    let query = `SELECT * FROM app_bancario.account
    inner join app_bancario.user on (user.iduser = account.iduser) ${name ? where : ""}`;
    const result = await executeQuery(query);
    return result;
  },
};
