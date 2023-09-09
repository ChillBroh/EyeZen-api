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
router.get("/:email", getDoctorById);

// Update a doctor by ID
router.put("/", updateDoctor);

// Delete a doctor by ID
router.delete("/:email", deleteDoctor);

module.exports = router;
