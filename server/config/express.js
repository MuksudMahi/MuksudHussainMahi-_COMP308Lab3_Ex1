let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

//modules for authentication
let session = require("express-session");
let passport = require("passport");
let localSrategy = require("passport-local");
let bodyParser = require("body-parser");
let cors = require("cors");

let indexRouter = require("../routes/index.server.routes");
let courseRouter = require("../routes/course.server.routes");
let studentRouter = require("../routes/student.server.routes");

//

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

//the process.env property allows you to access predefined environment letiables
//such as NODE_ENV
// Use the 'NDOE_ENV' letiable to activate the 'morgan' logger or 'compress' middleware
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(compress());
}
//app.use(logger("dev"));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//setup express session
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(cookieParser("SomeSecret"));

//User model instance
//let Student = require("mongoose").model("Student");

//auth strategy implementation
//passport.use(Student.createStrategy());

//serialize and deserialize user
//passport.serializeUser(Student.serializeUser());
//passport.deserializeUser(Student.deserializeUser());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

require("./passport")(passport);

//app.use(express.static(path.join(__dirname, "public")));

//routers
app.use("/", indexRouter);
app.use("/course", courseRouter);
app.use("/student", studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
