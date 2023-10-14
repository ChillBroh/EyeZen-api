const InfantFacts = require("../models/infantFact");

const generateFactId = async () => {
  try {
    // Find the last fact and sort by 'id' in descending order
    const lastFact = await InfantFacts.findOne().sort({ id: -1 });

    // If no facts exist, start with 'id' 1; otherwise, increment the last 'id'
    return (lastFact && lastFact.id + 1) || 1;
  } catch (error) {
    console.error("Error generating fact ID:", error);
    throw error;
  }
};

const createFact = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;

    // Validate the incoming data as needed
    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        error: "Invalid data",
      });
    }

    // Convert the incoming description string into an array
    const descriptionArray = description.split(',').map((item) => item.trim());

    // Generate the 'id' for the new fact
    const id = await generateFactId();

    // Create a new infant fact
    const newInfantFact = new InfantFacts({ id, title, description: descriptionArray, imageURL });

    // Save the new fact to the database
    await newInfantFact.save();

    res.status(201).json({ message: "Infant fact added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the infant fact." });
  }
};

const updateFact = async (req, res) => {
  try {
    const { id } = req.params; // Get the fact ID from the request parameters
    const { title, description, imageURL } = req.body;

    // Validate the incoming data as needed
    if (!title || !description || !imageURL) {
      return res.status(400).json({
        status: "error",
        error: "Invalid data",
      });
    }

    // Convert the incoming description string into an array
    const descriptionArray = description.split(',').map((item) => item.trim());

    // Find the infant fact by ID
    const existingFact = await InfantFacts.findOne({ id });

    if (!existingFact) {
      return res.status(404).json({
        status: "error",
        error: "Fact not found",
      });
    }

    // Update the existing fact with the new data
    existingFact.title = title;
    existingFact.description = descriptionArray;
    existingFact.imageURL = imageURL;

    // Save the updated fact to the database
    await existingFact.save();

    res.status(200).json({ message: "Infant fact updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the infant fact." });
  }
};

// Function to delete an existing infant fact
const deleteFact = async (req, res) => {
  try {
    const { id } = req.params; // Get the fact ID from the request parameters

    // Find the infant fact by ID
    const existingFact = await InfantFacts.findOneAndDelete({ "id" : id});

    if (!existingFact) {
      return res.status(404).json({
        status: "error",
        error: "Fact not found",
      });
    }

    res.status(200).json({ message: "Infant fact deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the infant fact." });
  }
};

// Function to get all infant facts
const getAllFacts = async (req, res) => {
  try {
    // Retrieve all infant facts from the database
    const facts = await InfantFacts.find();

    res.status(200).json(facts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching infant facts." });
  }
};

module.exports = {
  createFact,
  updateFact,
  deleteFact,
  getAllFacts
};
