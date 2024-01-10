const morgan = require("morgan");
const express = require("express");
const tourRouter = require("./routers/tourRouter");
const userRouter = require("./routers/userRouter");

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes Handler

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
