const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 400);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://donavangrobler:42069@mern-stack-project.ad4vguk.mongodb.net/mern-stack-course-collection?retryWrites=true&w=majority&appName=MERN-Stack-Project"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch();
