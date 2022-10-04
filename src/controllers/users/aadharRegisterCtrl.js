const { json } = require("express");
const expressAsyncHandler = require("express-async-handler");
const Aadhar = require("../../model/Aadhar");
const User = require("../../model/User");
const otpGenerator = require("otp-generator");
const Otp = require("../../model/Otp");
const bcrypt = require("bcrypt");

const registerAadharUser = expressAsyncHandler(async (req, res) => {
  const { aadharNumber, firstName, lastName, phone, dob } = req?.body;
  const userExists = await Aadhar.findOne({ aadharNumber });
  if (userExists) {
    throw new Error("User already exists");
  }
  try {
    const user = await Aadhar.create({
      aadharNumber,
      firstName,
      lastName,
      phone,
      dob,
    });
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
});

const registerUser = async (req, res) => {
  const { aadharNumber } = req?.body;
  try {
    const userAlready = await User.findOne({
      aadharNumber,
    });
    if (userAlready) {
      res.json("User already signed up");
      return;
    }
    const user = await Aadhar.findOne({ aadharNumber });
    if (!user) {
      res.status("Data not found in Aadhar database.");
      return;
    }

    const OTP = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    const number_otp = user.phone;

    console.log(OTP);
    const otp = new Otp({ number: number_otp, otp: OTP });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();

    const sid = "AC3076a4347462b747c4591ef11f6fca2d";
    const auth_token = "ebca422db61e8cd2a42e6a46a772c760";

    const twilio = require("twilio")(sid, auth_token);

    twilio.messages
      .create({
        from: "+15618232844",
        to: number_otp,
        body: OTP,
      })
      .then((res) => console.log("OTP sent"))
      .catch((err) => console.log(err.message));

    res.json("login");
  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  const aadharNumber = req.params.aadharNumber;
  console.log(aadharNumber);
  const aadhar = await Aadhar.findOne({ aadharNumber });

  const number = aadhar?.phone;
  const otpHolder = await Otp.find({ number });
  if (otpHolder.length === 0) {
    return res.status(400).json("Invalid OTP");
  }

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

  if (rightOtpFind.number === number && validUser) {
    const user = await User.create({
      firstName: aadhar.firstName,
      lastName: aadhar.lastName,
      aadharNumber: aadhar.aadharNumber,
    });
    res.status(200).json(user);
  } else {
    res.status(400).json("Error");
  }
};

//fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  registerAadharUser,
  registerUser,
  verifyOtp,
  fetchUsersCtrl,
};
