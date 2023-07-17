const mongoose = require("mongoose");

const gajiSchema = new mongoose.Schema({
  tanggal: { type: Date },
  totalPendapatan: { type: Number },
  totalPotongan: { type: Number },
  gajiBersih: { type: Number },
  keterangan: { type: String, default: "" },
  karyawan: { type: Object },
});

// gajiSchema.index({ karyawan: 1, tanggal: 1 }, { unique: true });

module.exports = mongoose.model("gaji", gajiSchema);
