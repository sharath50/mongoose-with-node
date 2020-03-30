// getting http server module
const express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  dotenv = require("dotenv");

// getting file read module
const fs = require("fs"),
  url = require("url"),
  path = require("path");

// initializing the express framework for server
dotenv.config({ path: "config.env" });
app.use(express.json());

// handling all internal errors ( 500 )
app.use((req, res, next, err) => {
  let error = err.status || 500;
  res.send({ status: error, message: "sorry!, internall error" });
});

// index api point welcome message...
app.get("/", (req, res) => {
  res.status(200).send({
    message: "welcome to mongoose practice app",
    routeList: ["/users/", "/employees/", "/articles/"],
    status: "ok"
  });
});

// importing routers from this repository

app.use("/create/", require("./routes/creating"));
app.use("/get/", require("./routes/getting"));
app.use("/search/", require("./routes/searching"));
app.use("/update/", require("./routes/updating"));
app.use("/delete/", require("./routes/deleting"));
app.use("/remove/", require("./routes/removing"));
app.use("/aggregate/", require("./routes/aggregating"));

// handling 404 error
app.use((req, res) => {
  res.json({ status: 404, message: "sorry!, page not found" });
});

// listening on port
const port = process.env.HTTP_PORT || 3000;
http.listen(port, () => {
  console.log("app listening on port : " + port);
});
