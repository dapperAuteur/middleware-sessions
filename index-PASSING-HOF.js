const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

function checkPassword(fn) {
  // return a function
  // that function should take a req, res
  // if the password is correct, call fn(req, res)
  // else respond with a 403 error
  return (req, res) => {
    if (req.query.password !== "42") {
      res.status(403).json({ message: "wrong password" });
      return;
    }
    fn(req, res);
  };
}

function checkHeaderAndPassword(fn) {
  return (req, res) => {
    if (req.headers.bacon !== "delicious") {
      res.status(403).json({ message: "you know you're wrong, right" });
      return;
    }
    fn(req, res);
  };
}

app.get(
  "/bacon",
  checkHeaderAndPassword(
    checkPassword((req, res) => {
      res.json({ data: [1, 2, 3, 4] });
    })
  )
);

app.get(
  "/data",
  checkPassword((req, res) => {
    res.json({
      data: [1, 3, 3, 7]
    });
  })
);

app.get(
  "/data2",
  checkPassword((req, res) => {
    res.json({
      data: [1, 3, 3, 8]
    });
  })
);

const port = 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
