const express = require("express");
const {
  registerAadharUser,
  registerUser,
  verifyOtp,
  fetchUsersCtrl,
} = require("../../controllers/users/aadharRegisterCtrl");
const userRoute = express.Router();

userRoute.post("/aadharregister", registerAadharUser);
userRoute.post("/register", registerUser);
userRoute.post("/register/verify/:aadharNumber", verifyOtp);
userRoute.get("/", fetchUsersCtrl);

module.exports = userRoute;
