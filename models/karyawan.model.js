const mongoose = require("mongoose");

const karyawanSchema = new mongoose.Schema({
  nama: { type: String },
  nik: { type: String, unique: true },
  gajiPokok: { type: Number },
  golongan: {
    nama: { type: String },
    tunjanganGolongan: { type: Number, default: 0 },
  },
  jabatan: {
    nama: { type: String },
    tunjanganJabatan: { type: Number, default: 0 },
    tunjanganKeluarga: { type: Number, default: 0 },
    tunjanganAnak: { type: Number, default: 0 },
  },
  statusPernikahan: {
    type: String,
    enum: ["menikah", "belum", "bercerai"],
  },
  jumlahAnak: { type: Number, default: 0 },
  benefit: [
    {
      nama: { type: String, unique: true },
      jumlahBenefit: { type: Number, default: 0 },
    },
  ],
  potongan: [
    {
      nama: { type: String, unique: true },
      jumlahPotongan: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("karyawan", karyawanSchema);
