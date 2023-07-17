const mongoose = require("mongoose");

const gajiSchema = new mongoose.Schema({
  tanggal: { type: Date },
  totalPendapatan: { type: Number },
  totalPotongan: { type: Number },
  gajiBersih: { type: Number },
  keterangan: { type: String, default: "" },
  karyawan: { type: String },
  nama: { type: String },
  golongan: { type: String },
  jabatan: { type: String },
  detailPendapatan: [{ nama: String, jumlah: Number }],
  detailPendapatan: [{ nama: String, jumlah: Number }],
});

gajiSchema.index({ nik: 1, tanggal: 1 }, { unique: true });

module.exports = mongoose.model("gaji", gajiSchema);
