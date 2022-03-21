let express = require("express");
let mongoose = require("mongoose");
let Student = mongoose.model("Student");
let passport = require("passport");

let Course = mongoose.model("Course");

//Register new user
module.exports.register = (req, res, next) => {
  // let newStudent = new Student(req.body);

  // Student.register(newStudent, req.body.password)
  //   .then(() => res.json(newStudent))
  //   .catch((err) => res.status(400).json("Error: " + err));
  passport.authenticate("local-signup", (err, user, info) => {
    //server error
    if (err) {
      return res.json(err);
    }
    if (user == false) {
      return res.json(info);
    }
    //user login error
    req.login(user, (err) => {
      //server error
      if (err) {
        return res.json(err);
      }
      return res.json({ success: "Yes", message: "Successfully registered" });
    });
  })(req, res, next);
};

//Get a user
module.exports.processLogin = (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    //server error
    if (err) {
      return next(err);
    } else if (!user) {
      return res.json(info);
    }
    //user login error
    else {
      req.login(user, (err) => {
        //server error
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    }
  })(req, res, next);
};

//Logout
module.exports.processLogout = (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.json("Logged out");
  } else {
    return res.json("Not Logged in");
  }
};

//Get student's courses
module.exports.getStudentCourses = (req, res, next) => {
  if (req.user) {
    Student.findOne({ _id: req.user._id })
      .select({ courses: 1 })
      .populate({ path: "courses._id", model: "Course" })
      .then((result) => {
        res.json(result.courses);
      });
  } else return res.json({ message: "session expired" });
};

//Get student list
module.exports.getStudentList = (req, res, next) => {
  if (req.user) {
    Student.find()
      .select({ studentNumber: 1, firstName: 1, lastName: 1 })
      .then((result) => res.json(result))
      .catch((err) => res.json("Error: " + err));
  } else return res.json({ message: "session expired" });
};

//get logged in student
module.exports.getStudent = (req, res, next) => {
  //console.log(req.user);
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({ success: "no" });
  }
};

//add a course
module.exports.addCourse = (req, res, next) => {
  if (req.user) {
    let currentStudent = req.user;
    currentStudent.courses.push({
      _id: mongoose.Types.ObjectId(req.body.courseId),
      section: "1",
    });
    Course.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.body.courseId),
      { $push: { students: currentStudent._id } },
      { new: true, upsert: true },
      function (err, managerparent) {
        if (err) return res.json({ message: err.message });
        return;
      }
    );
    currentStudent
      .save()
      .then(res.json({ success: "yes", message: "Course Enrolled" }))
      .catch((err) => res.status(400).json(err));
  } else return res.json({ message: "session expired" });
};

//drop a course
module.exports.dropCourse = (req, res, next) => {
  if (req.user) {
    let currentStudent = req.user;
    let courses = currentStudent.courses.filter((value, index, arr) => {
      return !value._id.equals(mongoose.Types.ObjectId(req.body.courseId));
    });
    currentStudent.courses = courses;
    currentStudent
      .save()
      .then()
      .catch((err) => {
        return res.status(400).json(err);
      });
    Course.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.body.courseId),
      { $pull: { students: currentStudent._id } },
      { new: true, upsert: true },
      function (err, managerparent) {
        if (err) return res.json({ message: err.message });
        return res.json({ message: "Course dropped" });
      }
    );
  } else return res.json({ message: "session expired" });
};

//update course
module.exports.updateCourse = (req, res, next) => {
  if (req.user) {
    let currentStudent = req.user;
    let updatedCourse = {
      _id: mongoose.Types.ObjectId(req.body.courseId),
      section: req.body.section,
    };

    let courses = currentStudent.courses.filter((value, index, arr) => {
      return !value._id.equals(updatedCourse._id);
    });

    currentStudent.courses = courses;
    currentStudent.courses.push(updatedCourse);

    currentStudent
      .save()
      .then(res.json({ message: "Section changed" }))
      .catch((err) => res.json(err));
  } else return res.json({ message: "session expired" });
};
