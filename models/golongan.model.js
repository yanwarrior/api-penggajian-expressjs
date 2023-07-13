const mongoose = require("mongoose");

const golonganSchema = new mongoose.Schema({
  nama: { type: String, unique: true },
  tunjanganGolongan: { type: Number, default: 0 },
});

module.exports = mongoose.model("golongan", golonganSchema);
