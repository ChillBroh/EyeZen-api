const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/authMiddleware");
const {
  createTreatment,
  getAllTreatments,
  getTreatmentById,
  updateTreatment,
  deleteTreatment,
} = require("../controllers/treatmentController");

// Create a new treatment with photo upload
router.post("/", protect, createTreatment);

// Get all treatments
router.get("/", getAllTreatments);

// Get a single treatment by ID
router.get("/:id", getTreatmentById);

// Update a treatment by ID
router.put("/:id", protect, updateTreatment);

// Delete a treatment by ID
router.delete("/:id", protect, deleteTreatment);

module.exports = router;
