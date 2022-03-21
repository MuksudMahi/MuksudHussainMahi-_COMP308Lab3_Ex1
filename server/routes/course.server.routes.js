let express = require("express");
let router = express.Router();

let courseController = require("../controllers/course.server.controllers");

let checkAuth = require("../config/auth");

router.get("/", courseController.showCourseList);
router.post("/addcourse", courseController.addCourse);
router.get("/find/:courseCode", courseController.findByCourseCode);
router.get("/students/:courseId", courseController.showEnrolledStudents);
router.post("/addstudent", courseController.addStudentToCourse);
router.post("/delete", courseController.deletCourse);

module.exports = router;
