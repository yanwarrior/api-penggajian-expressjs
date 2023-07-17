const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const karyawanModel = require("../models/karyawan.model");
const karyawanController = express.Router();

karyawanController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const {
      nama,
      nik,
      gajiPokok,
      golongan,
      jabatan,
      statusPernikahan,
      jumlahAnak,
      benefit,
      karyawan,
    } = req.body;

    // Validasi body
    if (
      !(
        nama &&
        nik &&
        gajiPokok &&
        golongan &&
        jabatan &&
        statusPernikahan &&
        jumlahAnak &&
        benefit
      )
    ) {
      return res.status(400).json({ message: "All data required." });
    }

    const karyawanAda = await karyawanModel.findOne({ nik });
    if (karyawanAda) {
      return res.status(400).json({ message: "Karyawan already exist." });
    }

    // Simpan karyawan ke dalam database
    const karyawanBaru = await karyawanModel.create(req.body);

    return res.status(201).json(karyawanBaru);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

karyawanController.get("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    // Mengambil daftar karyawan dari database
    const daftarKaryawan = await karyawanModel.find();
    return res.status(200).json(daftarKaryawan);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

karyawanController.get(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      // Mengambil detail karyawan dari database
      // berdasarkan id parameter
      const karyawan = await karyawanModel.findOne({ _id: req.params.id });
      return res.status(200).json(karyawan);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

karyawanController.put(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      const karyawan = await karyawanModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );

      return res.status(200).json(karyawan);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

karyawanController.delete(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      await karyawanModel.findOneAndDelete({ _id: req.params.id });

      return res.status(204).json(null);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

module.exports = karyawanController;
