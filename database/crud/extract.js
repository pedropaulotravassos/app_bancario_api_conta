const { executeQuery } = require("../conection");

exports.extract = {
  async create(payload) {
    let query =
      "INSERT INTO app_bancario.extract (date, value, account_idaccount, operation_type_id, credit_type_id) values (NOW(), ?, ?, ?, ?);";
    const result = await executeQuery(query, [
      payload.value,
      payload.idaccount,
      payload.operation_type_id,
      payload.credit_type_id,
    ]);
    return result;
  },
  async read(name) {
    const where = `WHERE name = "${name}"`;
    let query = `SELECT * FROM app_bancario.extract
    inner join account on (extract.account_idaccount = account.idaccount) 
    inner join user on (user.iduser = account.iduser) ${name ? where : ""}`;
    const result = await executeQuery(query);
    return result;
  },
};
