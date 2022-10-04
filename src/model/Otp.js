const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    number: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      require: true,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
  },
  { timestamps: true }
);

const Otp = mongoose.model("OTP", otpSchema);
module.exports = Otp;
