const { account } = require("../database/crud/account");
const { extract } = require("../database/crud/extract");

class Account {
  constructor(payload) {
    this.idaccount = payload.idaccount;
    this.iduser = payload.iduser;
    this.balance = payload.balance;
    this.name = payload.name;
  }

  async depositOrWithdraw(value, operation_type_id, credit_type_id) {
    const currentAccount = await this.getAccount(this.name);
    this.idaccount = currentAccount[0].idaccount
    await extract.create({
      value: parseFloat(value),
      idaccount: currentAccount[0].idaccount,
      operation_type_id: parseInt(operation_type_id),
      credit_type_id: parseInt(credit_type_id),
    });
    let newValue =
      operation_type_id == 1
        ? parseFloat(currentAccount[0].balance) + parseFloat(value)
        : parseFloat(currentAccount[0].balance) - parseFloat(value);
    this.balance = newValue;
    await account.update(this);
    return `o novo saldo é: ${this.balance}`;
  }

  async createAccount() {
    await account.create(this);
    return "Created Account";
  }

  async getAccount(name) {
    const result = await account.read(name);
    return result;
  }
}

module.exports = Account;
