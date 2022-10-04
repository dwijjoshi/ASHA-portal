const mongoose = require("mongoose");

const aadharSchema = mongoose.Schema(
  {
    aadharNumber: {
      required: [true, "Aadhar Number is required"],
      type: String,
    },

    firstName: {
      required: [true, "First Name is required"],
      type: String,
    },

    lastName: {
      required: [true, "Last Name is required"],
      type: String,
    },

    phone: {
      required: [true, "Phone Number is required"],
      type: String,
    },

    dob: {
      required: [true, "Date of birth is required"],
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Aadhar = mongoose.model("Aadhar", aadharSchema);
module.exports = Aadhar;
