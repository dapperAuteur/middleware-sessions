const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(delayRequest);
app.use(aboutBret);

function delayRequest(req, res, next) {
  // setTimeout((req, res, next), 2000);
  setTimeout(next, 2000);
}

function aboutBret(req, res, next) {
  axios.get();
  if (res.data.username === response.data.username) {
    next();
  }
  console.log("res.data.username !== axios response.data.username");
}

function checkPassword(req, res, next) {
  console.log("req", req);
  // return a function
  // that function should take a req, res
  // if the password is correct, call fn(req, res)
  // else respond with a 403 error
  if (req.query.password !== "42") {
    res.status(403).json({ message: "wrong password" });
    return;
  }
  next();
}

function checkHeaderAndPassword(req, res, next) {
  if (req.headers.bacon !== "delicious") {
    res.status(403).json({ message: "you know you're wrong, right" });
    return;
  }
  next();
}

app.get("/bacon", checkHeaderAndPassword, checkPassword, (req, res) => {
  res.json({ data: [1, 2, 3, 4] });
});

app.get("/data", checkPassword, (req, res) => {
  res.json({
    data: [1, 3, 3, 7]
  });
});

app.get("/data2", checkPassword, (req, res) => {
  res.json({
    data: [1, 3, 3, 8]
  });
});

const port = 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
