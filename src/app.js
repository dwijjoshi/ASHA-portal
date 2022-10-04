const express = require("express");
const dbConnect = require("./config/dbConnect");
const {
  registerAadharUser,
} = require("./controllers/users/aadharRegisterCtrl");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/users/usersRoute");
const dotenv = require("dotenv");

const app = express();

//env
dotenv.config();

//0EEG4onL3KghoKZg
//mongodb+srv://me:<password>@asha-portal-2.qynbduq.mongodb.net/?retryWrites=true&w=majority
dbConnect();

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRoute);

//error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
