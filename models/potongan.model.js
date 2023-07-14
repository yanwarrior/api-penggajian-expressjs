const mongoose = require("mongoose");

const potonganSchema = new mongoose.Schema({
  nama: { type: String, unique: true },
  jumlahPotongan: { type: Number, default: 0 },
});

module.exports = mongoose.model("potongan", potonganSchema);
