const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const jabatanModel = require("../models/jabatan.model");
const jabatanController = express.Router();

jabatanController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const { nama, tunjanganJabatan, tunjanganKeluarga, tunjanganAnak } =
      req.body;

    // Validasi body
    if (!(nama, tunjanganJabatan, tunjanganKeluarga, tunjanganAnak)) {
      return res.status(400).json({ message: "All data required." });
    }

    const jabatanAda = await jabatanModel.findOne({ nama });

    if (jabatanAda) {
      return res.status(400).json({ message: "Jabatan aleready exist." });
    }

    // Simpan jabatan ke dalam database
    const jabatanBaru = await jabatanModel.create({
      nama: nama.toUpperCase(),
      tunjanganJabatan,
      tunjanganKeluarga,
      tunjanganAnak,
    });

    return res.status(201).json(jabatanBaru);
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong." });
  }
});

module.exports = jabatanController;
