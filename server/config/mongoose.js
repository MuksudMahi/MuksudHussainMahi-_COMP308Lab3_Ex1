// Load the module dependencies:
//  config.js module and mongoose module
var config = require("./config"),
  mongoose = require("mongoose");
// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(config.db)
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error");
    });

  //Loading Course model
  require("../models/course.server.models");
  //Loading Student model
  require("../models/student.server.models");

  return db;
};
