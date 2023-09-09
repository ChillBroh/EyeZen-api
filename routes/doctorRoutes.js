const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/authMiddleware");
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// Create a new doctor
router.post("/", createDoctor);

// Get all doctors
router.get("/", getAllDoctors);

// Get a single doctor by ID
router.get("/:id", getDoctorById);

// Update a doctor by ID
router.put("/:id", updateDoctor);

// Delete a doctor by ID
router.delete("/:id", deleteDoctor);

module.exports = router;
