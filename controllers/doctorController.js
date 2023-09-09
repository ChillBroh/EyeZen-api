const Doctor = require("../models/doctorModel");

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      specialization,
      type,
      town,
      latitude,
      longitude,
      about,
      qualifications,
      experience,
      servicesOffered,
      officeHours,
      acceptedPaymentMethods,
      profilePicUrl, // Include profilePicUrl in the request body
    } = req.body;

    const newDoctor = new Doctor({
      name,
      email,
      mobile,
      specialization,
      type,
      town,
      latitude,
      longitude,
      about,
      qualifications,
      experience,
      servicesOffered,
      officeHours,
      acceptedPaymentMethods,
      profilePicUrl, // Assign profilePicUrl
    });

    console.log(newDoctor);

    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
    } else {
      res.status(200).json(doctor);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a doctor by ID
const updateDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      specialization,
      type,
      town,
      latitude,
      longitude,
      about,
      qualifications,
      experience,
      servicesOffered,
      officeHours,
      acceptedPaymentMethods,
      profilePicUrl, // Include profilePicUrl in the request body
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Define an object with the fields you want to update
    const updatedFields = {
      name: name || doctor.name,
      email: email || doctor.email,
      mobile: mobile || doctor.mobile,
      specialization: specialization || doctor.specialization,
      type: type || doctor.type,
      town: town || doctor.town,
      latitude: latitude || doctor.latitude,
      longitude: longitude || doctor.longitude,
      about: about || doctor.about,
      qualifications: qualifications || doctor.qualifications,
      experience: experience || doctor.experience,
      servicesOffered: servicesOffered || doctor.servicesOffered,
      officeHours: officeHours || doctor.officeHours,
      acceptedPaymentMethods:
        acceptedPaymentMethods || doctor.acceptedPaymentMethods,
      profilePicUrl: profilePicUrl || doctor.profilePicUrl, // Assign profilePicUrl
    };

    // Update the doctor object with the new values
    Object.assign(doctor, updatedFields);

    // Save the updated doctor
    await doctor.save();

    // Return the updated doctor
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
    } else {
      await doctor.deleteOne();
      res.status(200).json({ message: "Doctor deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
