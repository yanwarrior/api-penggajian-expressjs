const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const golonganModel = require("../models/golongan.model");
const golonganController = express.Router();

golonganController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const { nama, tunjanganGolongan } = req.body;

    // Validasi body
    if (!(nama && tunjanganGolongan)) {
      return res.status(400).json({ message: "All data required." });
    }

    const golonganAda = await golonganModel.findOne({ nama });

    if (golonganAda) {
      return res.status(400).json({ message: "Golongan already exist." });
    }

    // Simpan golongan ke dalam database
    const golonganBaru = await golonganModel.create({
      nama: nama.toUpperCase(),
      tunjanganGolongan,
    });

    return res.status(201).json(golonganBaru);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

module.exports = golonganController;
