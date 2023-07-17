const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const gajiModel = require("../models/gaji.model");
const gajiController = express.Router();

gajiController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    if (req.body.karyawan.jumlahAnak > 0) {
      req.body.totalPendapatan +=
        req.body.karyawan.jumlahAnak * req.body.karyawan.jabatan.tunjanganAnak;
    }

    if (req.body.karyawan.statusPernikahan === "menikah") {
      req.body.totalPendapatan += req.body.karyawan.jabatan.tunjanganKeluarga;
    }

    req.body.totalPendapatan += req.body.karyawan.gajiPokok;

    if (req.body.karyawan.benefit && req.body.karyawan.benefit.length > 0) {
      for (benefit of req.body.karyawan.benefit) {
        req.body.totalPendapatan += benefit.jumlahBenefit;
      }
    }

    req.body.totalPendapatan +=
      req.body.karyawan.golongan.tunjanganGolongan +
      req.body.karyawan.jabatan.tunjanganJabatan;

    // Pemotongan gaji
    if (req.body.karyawan.potongan && req.body.karyawan.potongan.length > 0) {
      for (potongan of req.body.karyawan.potongan) {
        req.body.totalPotongan += potongan.jumlahPotongan;
      }
    }

    req.body.gajiBersih = req.body.totalPendapatan - req.body.totalPotongan;

    const gaji = await gajiModel.create(req.body);

    return res.status(201).json(gaji);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something when wrong." });
  }
});

module.exports = gajiController;
