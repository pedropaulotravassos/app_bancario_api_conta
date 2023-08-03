const express = require("express");
const Account = require("./entity/account");
const User = require("./entity/user");
const app = express();
app.use(express.json());
const cors = require('cors');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.post("/account", async (req, res) => {
  const account = new Account(req.body);
  const result = await account.createAccount();
  res.send(result);
});

app.post("/account-update", async (req, res) => {
  const account = new Account(req.body);
  const result = await account.depositOrWithdraw(req.body.value, req.body.operation_type_id, req.body.credit_type_id);
  res.send(result);
});

app.get("/account", async (req, res) => {
  const account = new Account({});
  const result = await account.getAccount(req.query.name);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(result);
});

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  const result = await user.createUser();
  res.header("Access-Control-Allow-Origin", "*");
  res.send(result);
});
app.get("/user", async (req, res) => {
  const user = new User({});
  const result = await user.getUser(req.query.name);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(result);
});
app.get("/user-extract", async (req, res) => {
  const user = new User({});
  const result = await user.getUserExtract(req.query.name);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(result);
});

app.listen(3001, () => {
  console.log("app started");
});
