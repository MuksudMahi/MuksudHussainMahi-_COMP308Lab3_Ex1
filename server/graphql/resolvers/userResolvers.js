let mongoose = require("mongoose");
let Student = mongoose.model("Student");
let Course = mongoose.model("Course");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let passport = require("passport");
const { token } = require("morgan");
let keys = require("../../helpers/keys");
module.exports = {
  //Student
  createStudent: async (args) => {
    try {
      let studentToSave = new Student(args.newStudent);
      console.log(studentToSave);
      await studentToSave.save();
      return { message: "ok" };
    } catch (err) {
      return { message: err.message };
    }
  },
  login: async ({ studentNumber, password }) => {
    //server error
    console.log(studentNumber);
    try {
      const student = await Student.findOne({ studentNumber });
      if (!student) {
        throw new Error("Invalid Credentials!student");
      }
      const isCorrectPassword = await bcrypt.compare(
        password,
        student.password
      );
      if (!isCorrectPassword) {
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
      return { token, id: student._id };
    } catch (error) {
      return error;
    }
  },
  getStudentCourses: async ({ id }) => {
    try {
      var courses = await Student.findOne({
        _id: mongoose.Types.ObjectId(id),
      })
        .select({ courses: 1 })
        .populate({ path: "courses._id", model: "Course" });
      //console.log(courses.courses.map((item) => item._id.courseName));
      return { _id: courses.courses, status: "Ok" };
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

  //Course

  //Mutations
  createCourse: async (args) => {
    try {
      let newCourse = new Course(args.newCourse);
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
  deleteCourse: async ({courseId}) => {
    try {
      await Course.findOne({_id: mongoose.Types.ObjectId(courseId)}) ;
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
  showEnrolledStudents: async ({id})=>{
    try{
      console.log(id);
    let course = await Course.findOne({_id: mongoose.Types.ObjectId(id)})
      .populate({
        path: "students",
        select: "studentNumber firstName lastName",
      });
      console.log(course);
      return course;
      
    }catch(error){
      console.log(error);
    }
  },
  showCourseList: async () => {
    try {
      let courses = await Course.find();
      return courses;
    } catch (error) {
      
    }
  }

};
