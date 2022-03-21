let express = require("express");
let router = express.Router();

let studentController = require("../controllers/student.server.controllers");

let checkAuth = require("../config/auth");

router.post("/register", studentController.register);
router.get("/", studentController.getStudent);
router.post("/login", studentController.processLogin);
router.get("/logout", studentController.processLogout);
router.get("/list", studentController.getStudentList);
router.get("/courses", studentController.getStudentCourses);
router.post("/addcourse", studentController.addCourse);
router.post("/dropcourse", studentController.dropCourse);
router.post("/updatecourse", studentController.updateCourse);

module.exports = router;
