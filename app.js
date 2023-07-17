require("dotenv").config();
require("./config/database")();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/users", require("./controllers/user.controller"));
app.use("/jabatan", require("./controllers/jabatan.controller"));
app.use("/golongan", require("./controllers/golongan.controller"));
app.use("/benefit", require("./controllers/benefit.controller"));
app.use("/potongan", require("./controllers/potongan.controller"));
app.use("/karyawan", require("./controllers/karyawan.controller"));
app.use("/gaji", require("./controllers/gaji.controller"));

module.exports = app;
