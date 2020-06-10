const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// create express app
const app = express();

//Enable all CORS requests
var cors = require("cors");
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to KushHub",
  });
});

// ........

// Require Notes routes
require("./app/routes/note.routes.js")(app);

// ........

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
