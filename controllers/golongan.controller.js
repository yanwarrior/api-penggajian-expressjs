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

golonganController.get("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    // Mengambil daftar golongan dari database
    const daftarGolongan = await golonganModel.find();
    return res.status(200).json(daftarGolongan);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

golonganController.get(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      // Mengambil detail golongan dari database
      // berdasarkan id parameter
      const golongan = await golonganModel.findOne({ _id: req.params.id });
      return res.status(200).json(golongan);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

golonganController.put(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      const golongan = await golonganModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );

      return res.status(200).json(golongan);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

golonganController.delete(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      await golonganModel.findOneAndDelete({ _id: req.params.id });

      return res.status(204).json(null);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

module.exports = golonganController;
