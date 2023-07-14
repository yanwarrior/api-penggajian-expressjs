const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const potonganModel = require("../models/potongan.model");
const potonganController = express.Router();

potonganController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const { nama, jumlahPotongan } = req.body;

    // Validasi body
    if (!(nama && jumlahPotongan)) {
      return res.status(400).json({ message: "All data required." });
    }

    const potonganAda = await potonganModel.findOne({ nama });

    if (potonganAda) {
      return res.status(400).json({ message: "Potongan already exist." });
    }

    // Simpan potongan ke dalam database
    const potonganBaru = await potonganModel.create({
      nama: nama.toUpperCase(),
      jumlahPotongan,
    });

    return res.status(201).json(potonganBaru);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

potonganController.get("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    // Mengambil daftar potongan dari database
    const daftarPotongan = await potonganModel.find();
    return res.status(200).json(daftarPotongan);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

potonganController.get(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      // Mengambil detail potongan dari database
      // berdasarkan id parameter
      const potongan = await potonganModel.findOne({ _id: req.params.id });
      return res.status(200).json(potongan);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

potonganController.put(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      const potongan = await potonganModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );

      return res.status(200).json(potongan);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

potonganController.delete(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      await potonganModel.findOneAndDelete({ _id: req.params.id });

      return res.status(204).json(null);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

module.exports = potonganController;
