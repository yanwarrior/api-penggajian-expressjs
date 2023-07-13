const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const benefitModel = require("../models/benefit.model");
const benefitController = express.Router();

benefitController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const { nama, jumlahBenefit } = req.body;

    // Validasi body
    if (!(nama && jumlahBenefit)) {
      return res.status(400).json({ message: "All data required." });
    }

    const benefitAda = await benefitModel.findOne({ nama });

    if (benefitAda) {
      return res.status(400).json({ message: "Benefit already exist." });
    }

    // Simpan benefit ke dalam database
    const benefitBaru = await benefitModel.create({
      nama: nama.toUpperCase(),
      jumlahBenefit,
    });

    return res.status(201).json(benefitBaru);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

benefitController.get("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    // Mengambil daftar benefit dari database
    const daftarBenefit = await benefitModel.find();
    return res.status(200).json(daftarBenefit);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

benefitController.get(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      // Mengambil detail benefit dari database
      // berdasarkan id parameter
      const benefit = await benefitModel.findOne({ _id: req.params.id });
      return res.status(200).json(benefit);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

benefitController.put(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      const benefit = await benefitModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );

      return res.status(200).json(benefit);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

benefitController.delete(
  "/:id",
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      await benefitModel.findOneAndDelete({ _id: req.params.id });

      return res.status(204).json(null);
    } catch (error) {
      return res.status(400).json({ message: "Something when wrong." });
    }
  }
);

module.exports = benefitController;
