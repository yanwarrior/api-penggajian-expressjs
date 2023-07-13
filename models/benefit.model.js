const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
  nama: { type: String, unique: true },
  jumlahBenefit: { type: Number, default: 0 },
});

module.exports = mongoose.model("benefit", benefitSchema);
