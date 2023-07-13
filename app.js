require("dotenv").config();
require("./config/database")();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/users", require("./controllers/user.controller"));
app.use("/jabatan", require("./controllers/jabatan.controller"));
app.use("/golongan", require("./controllers/golongan.controller"));

module.exports = app;
