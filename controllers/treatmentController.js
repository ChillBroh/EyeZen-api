const Treatment = require("../models/treatmnetModel");

// Create a new treatment
const createTreatment = async (req, res) => {
  try {
    const { title, type, description, photoUrl } = req.body;

    const newTreatment = new Treatment({
      title,
      type,
      description,
      photoUrl,
    });

    await newTreatment.save();
    res.status(201).json(newTreatment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all treatments
const getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({});
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single treatment by ID
const getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      res.status(404).json({ error: "Treatment not found" });
    } else {
      res.status(200).json(treatment);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a treatment by ID
const updateTreatment = async (req, res) => {
  try {
    const { title, type, description, photoUrl } = req.body;
    const treatment = await Treatment.findById(req.params.id);

    if (!treatment) {
      return res.status(404).json({ error: "Treatment not found" });
    }

    const updatedFields = {
      title: title || treatment.title,
      type: type || treatment.type,
      description: description || treatment.description,
      photoUrl: photoUrl || treatment.photoUrl,
    };

    // Update the treatment object with the new values
    Object.assign(treatment, updatedFields);

    // Save the updated treatment
    await treatment.save();

    // Return the updated treatment
    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a treatment by ID
const deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id);

    if (!treatment) {
      res.status(404).json({ error: "Treatment not found" });
    } else {
      await treatment.deleteOne();
      res.status(200).json({ message: "Treatment deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTreatment,
  getAllTreatments,
  getTreatmentById,
  updateTreatment,
  deleteTreatment,
};
