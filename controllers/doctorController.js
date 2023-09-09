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
      profilePicUrl,
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
      profilePicUrl,
    });

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

// Get a single doctor by email
const getDoctorById = async (req, res) => {
  try {
    const email = req.params.email;
    const doctor = await Doctor.findOne({ email });

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
      profilePicUrl,
    } = req.body;

    // Find the doctor by email
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Update the doctor object with the new values
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.mobile = mobile || doctor.mobile;
    doctor.specialization = specialization || doctor.specialization;
    doctor.type = type || doctor.type;
    doctor.town = town || doctor.town;
    doctor.latitude = latitude || doctor.latitude;
    doctor.longitude = longitude || doctor.longitude;
    doctor.about = about || doctor.about;
    doctor.qualifications = qualifications || doctor.qualifications;
    doctor.experience = experience || doctor.experience;
    doctor.servicesOffered = servicesOffered || doctor.servicesOffered;
    doctor.officeHours = officeHours || doctor.officeHours;
    doctor.acceptedPaymentMethods =
      acceptedPaymentMethods || doctor.acceptedPaymentMethods;
    doctor.profilePicUrl = profilePicUrl || doctor.profilePicUrl;

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
    const email = req.params.email;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    await doctor.deleteOne();
    return res.status(200).json({ message: "Doctor deleted" });
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
