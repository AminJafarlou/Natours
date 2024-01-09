const fs = require("fs");
const express = require("express");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

const app = express();
app.use(express.json());

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  const newTour = { ...req.body, id: tours.length + 1 };
  console.log({ body: req.body });
  const newTours = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log("Listening to server ...");
});
