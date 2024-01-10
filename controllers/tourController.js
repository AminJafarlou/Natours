const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.createNewTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
