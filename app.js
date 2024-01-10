const fs = require("fs");
const morgan = require("morgan");
const express = require("express");
const tourRouter = require("./routers/tourRouter");
const userRouter = require("./routers/userRouter");

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes Handler

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
