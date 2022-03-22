let mongoose = require("mongoose");
let User = mongoose.model("Student");
let Course = mongoose.model("Course");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let passport = require("passport");
const { token } = require("morgan");
let keys = require("../../helpers/keys");
module.exports = {
  createStudent: async (args) => {
    try {
      let userToSave = new User(args.newStudent);
      console.log(userToSave);
      await userToSave.save();
      return { message: "ok" };
    } catch (err) {
      return { message: err.message };
    }
  },
  login: async ({ studentNumber, password }) => {
    //server error
    console.log(studentNumber);
    try {
      const user = await User.findOne({ studentNumber });
      if (!user) {
        throw new Error("Invalid Credentials!user");
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("Invalid Credentials!password");
      }
      const token = jwt.sign(
        { _id: user._id, studentNumber: user.studentNumber },
        keys.private_key,
        {
          algorithm: "RS256",
          expiresIn: "1h",
        }
      );
      return { token, id: user._id };
    } catch (error) {
      return error;
    }
  },
};
