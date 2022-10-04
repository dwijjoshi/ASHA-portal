const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    aadharNumber: {
      required: [true, "Aadhar Number is required"],
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
