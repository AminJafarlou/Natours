const fs = require("fs");
const morgan = require("morgan");
const express = require("express");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes Handler
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      result: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  const tour = tours.find((item) => item.id === id);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

const createNewTour = (req, res) => {
  const newTour = { ...req.body, id: tours.length + 1 };
  const newTours = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(201).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      result: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour: "Updated tour ...",
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      result: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    requestedAt: req.requestTime,
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    requestedAt: req.requestTime,
    data: {
      message: "Not implemented",
    },
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    requestedAt: req.requestTime,
    data: {
      message: "Not implemented",
    },
  });
};

const createNewUser = (req, res) => {
  res.status(500).json({
    status: "error",
    requestedAt: req.requestTime,
    data: {
      message: "Not implemented",
    },
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    requestedAt: req.requestTime,
    data: {
      message: "Not implemented",
    },
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    requestedAt: req.requestTime,
    data: {
      message: "Not implemented",
    },
  });
};

// Routes
const tourRouter = express.Router();
tourRouter.route("/").get(getAllTours).post(createNewTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

const userRouter = express.Router();
userRouter.route("/").get(getAllUsers).post(createNewUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log("Listening to server ...");
});
