const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const gajiModel = require("../models/gaji.model");
const karyawanModel = require("../models/karyawan.model");
const gajiController = express.Router();

gajiController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const { nik } = req.body;

    const karyawan = await karyawanModel.findOne({ nik });
    const nama = karyawan.nama;
    const golongan = karyawan.golongan;
    const jabatan = karyawan.jabatan;
    const benefit = karyawan.benefit;
    const potongan = karyawan.potongan;
    let totalPotongan = 0;
    let totalPendapatan = 0;
    let gajiBersih = 0;
    let detailPotongan = [];
    let detailPendapatan = [];

    for (b of benefit) {
      totalPendapatan += b.jumlahBenefit;
      detailPendapatan.push({
        nama: b.nama,
        jumlah: b.jumlahBenefit,
      });
    }

    for (p of potongan) {
      totalPotongan += p.jumlahPotongan;
      detailPotongan.push({
        nama: p.nama,
        jumlah: p.jumlahPotongan,
      });
    }

    if (karyawan.jumlahAnak > 0) {
      totalPendapatan += karyawan.jumlahAnak * jabatan.tunjanganAnak;
      detailPendapatan.push({
        nama: "Tunjangan Anak",
        jumlah: karyawan.jumlahAnak * jabatan.tunjanganAnak,
      });
    }

    if (karyawan.statusPernikahan === "menikah") {
      totalPendapatan += jabatan.tunjanganKeluarga;
      detailPendapatan.push({
        nama: "Tunjangan Keluarga",
        jumlah: jabatan.tunjanganKeluarga,
      });
    }

    totalPendapatan += golongan.tunjanganGolongan + jabatan.tunjanganJabatan;

    detailPendapatan.push({
      nama: "Tunjangan Golongan",
      jumlah: golongan.tunjanganGolongan,
    });

    detailPendapatan.push({
      nama: "Tunjangan Jabatan",
      jumlah: jabatan.tunjanganJabatan,
    });

    gajiBersih = totalPendapatan - totalPotongan;

    const gaji = await gajiModel.create({
      nik: karyawan.nik,
      nama,
      golongan: golongan.nama,
      jabatan: jabatan.nama,
      tanggal: new Date(),
      totalPendapatan,
      totalPotongan,
      gajiBersih,
      detailPendapatan,
      detailPotongan,
    });

    return res.status(201).json(gaji);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something when wrong." });
  }
});

module.exports = gajiController;
