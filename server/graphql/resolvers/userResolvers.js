let mongoose = require("mongoose");
let Student = mongoose.model("Student");
let Course = mongoose.model("Course");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let passport = require("passport");
//const { token } = require("morgan");
let keys = require("../../helpers/keys");
let varify = require("../../helpers/jwt");
module.exports = {
  //Student
  student: async ({ studentId }, req) => {
    if (!req.isAuth) {
      //throw new Error("Unauthorized");
      console.log("Unauthorized");
    }
    const userInfo = await Student.findById(studentId).exec();
    console.log(userInfo);
    if (!userInfo) {
      //throw new Error("Error");
      console.log("Error");
    }
    return userInfo;
  },
  createStudent: async ({
    studentNumber,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    program,
    email,
    password,
  }) => {
    try {
      let studentToSave = new Student({
        studentNumber: studentNumber,
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        phoneNumber: phoneNumber,
        program: program,
        email: email,
        password: password,
      });
      studentToSave.password = studentToSave.generateHash(
        studentToSave.password
      );
      await studentToSave.save();
      return { message: "User Created", status: "Ok" };
    } catch (err) {
      return { message: err.message, status: "Failed" };
    }
  },
  login: async ({ studentNumber, password }) => {
    try {
      console.log("inside login");
      const student = await Student.findOne({ studentNumber });
      if (!student) {
        throw new Error("Invalid Credentials!student");
      }

      if (!student.validPassword(password)) {
        throw new Error("Invalid Credentials!password");
      }
      const token = jwt.sign(
        { _id: student._id, studentNumber: student.studentNumber },
        keys.private_key,
        {
          algorithm: "RS256",
          expiresIn: "1h",
        }
      );
      //console.log(req.isAuth);
      return { token, id: student._id };
    } catch (error) {
      return error;
    }
  },
  getStudentCourses: async ({ id }) => {
    try {
      console.log("here");
      var courses = await Student.findOne({
        _id: mongoose.Types.ObjectId(id),
      })
        .select({ courses: 1 })
        .populate({ path: "courses._id", model: "Course" });
      //console.log(courses.courses.map((item) => item._id.courseName));
      //return { _id: courses.courses, status: "Ok" };
      console.log(courses.courses);
      return courses;
    } catch (error) {
      console.log(error.message);
    }
  },
  getStudentList: () => {
    try {
      var students = Student.find().select({
        studentNumber: 1,
        firstName: 1,
        lastName: 1,
      });
      return { students: students, status: "Ok" };
    } catch (error) {
      console.log(error.message);
    }
  },
  enrollCourse: async ({ studentId, courseId }) => {
    try {
      let currentStudent = await Student.findById(
        mongoose.Types.ObjectId(studentId)
      );

      currentStudent.courses.push({
        _id: mongoose.Types.ObjectId(courseId),
        section: "1",
      });
      await Course.findByIdAndUpdate(
        mongoose.Types.ObjectId(courseId),
        { $push: { students: currentStudent._id } },
        { new: true, upsert: true }
      );
      await currentStudent.save();
      return {
        message: "Enrolled",
        status: "Ok",
      };
    } catch (error) {
      console.log(error);
    }
  },
  dropCourse: async ({ studentId, courseId }) => {
    try {
      let currentStudent = await Student.findById(
        mongoose.Types.ObjectId(studentId)
      );
      let courses = currentStudent.courses.filter((value, index, arr) => {
        return !value._id.equals(mongoose.Types.ObjectId(courseId));
      });
      currentStudent.courses = courses;
      await currentStudent.save();
      await Course.findByIdAndUpdate(
        mongoose.Types.ObjectId(courseId),
        { $pull: { students: currentStudent._id } },
        { new: true, upsert: true }
      );
      return {
        message: "Dropped",
        status: "Ok",
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateCourse: async ({ studentId, courseId, section }) => {
    try {
      let currentStudent = await Student.findById(
        mongoose.Types.ObjectId(studentId)
      );
      let updatedCourse = {
        _id: mongoose.Types.ObjectId(courseId),
        section: section,
      };
      let courses = currentStudent.courses.filter((value, index, arr) => {
        return !value._id.equals(updatedCourse._id);
      });
      currentStudent.courses = courses;
      currentStudent.courses.push(updatedCourse);
      await currentStudent.save();
      return {
        message: "Updated",
        status: "Ok",
      };
    } catch (error) {
      console.log(error);
    }
  },

  //Course

  //Mutations
  createCourse: async ({ courseCode, courseName, section, semester }) => {
    try {
      let newCourse = new Course({
        courseCode: courseCode,
        courseName: courseName,
        section: section,
        semester: semester,
      });
      await newCourse.save();
      return {
        message: "Course Added",
        status: "ok",
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Course not added",
        status: "Failed",
      };
    }
  },
  deleteCourse: async ({ studentId, courseId }) => {
    try {
      console.log(courseId);
      let currentStudent = await Student.findById(
        mongoose.Types.ObjectId(studentId)
      );
      let courses = currentStudent.courses.filter((value, index, arr) => {
        return !value._id.equals(mongoose.Types.ObjectId(courseId));
      });
      currentStudent.courses = courses;
      await currentStudent.save();
      //await Course.findOne({ _id: mongoose.Types.ObjectId(courseId) });
      await Course.deleteOne({ _id: mongoose.Types.ObjectId(courseId) });
      return {
        message: "Course Deleted",
        status: "Success",
      };
    } catch (error) {
      console.log(error);
    }
  },

  //Query
  showEnrolledStudents: async ({ id }) => {
    try {
      console.log(id);
      let course = await Course.findOne({
        _id: mongoose.Types.ObjectId(id),
      }).populate({
        path: "students",
        select: "studentNumber firstName lastName",
      });
      console.log(course);
      return course;
    } catch (error) {
      console.log(error);
    }
  },
  showCourseList: async () => {
    try {
      let courses = await Course.find();
      return courses;
    } catch (error) {}
  },
};
