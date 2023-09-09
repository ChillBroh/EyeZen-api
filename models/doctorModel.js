const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    servicesOffered: {
      type: [String], // An array of services offered by the doctor
      required: true,
    },
    officeHours: {
      type: String,
      required: true,
    },
    acceptedPaymentMethods: {
      type: [String], // An array of accepted payment methods
      required: true,
    },
    profilePicUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
