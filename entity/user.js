const { extract } = require("../database/crud/extract");
const { user } = require("../database/crud/user");
const Account = require("./account");

class User {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
  }

  async createUser() {
    await user.create(this);
    const createdUser = await this.getUser(this.name);
    const account = new Account({ ...createdUser[0], balance: 0 });
    await account.createAccount();
    return "Created User";
  }

  async getUser(name) {
    const result = await user.read(name);
    return result;
  }

  async getUserExtract(name) {
    const result = await extract.read(name);
    return result;
  }
}

module.exports = User;
