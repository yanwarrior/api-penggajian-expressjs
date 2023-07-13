const mongoose = require("mongoose");

const jabatanSchema = new mongoose.Schema({
  nama: { type: String, unique: true },
  tunjanganJabatan: { type: Number, default: 0 },
  tunjanganKeluarga: { type: Number, default: 0 },
  tunjanganAnak: { type: Number, default: 0 },
});

module.exports = mongoose.model("jabatan", jabatanSchema);
