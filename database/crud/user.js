const { executeQuery } = require("../conection");

exports.user = {
  async create(payload) {
    let query = "INSERT INTO user (name) VALUES (?);";
    const result = await executeQuery(query, [payload.name]);
    return result;
  },
  async read(name) {
    const where = `WHERE name = "${name}"`;
    let query = `SELECT * FROM user ${name ? where : ""}`;
    const result = await executeQuery(query);
    return result;
  },
};
