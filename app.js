require("dotenv").config();
require("./config/database")();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/users", require("./controllers/user.controller"));

module.exports = app;
