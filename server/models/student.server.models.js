let mongoose = require("mongoose");
let { Schema } = mongoose;
let passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require("bcrypt-nodejs");

let studentSchema = new Schema(
  {
    studentNumber: {
      type: String,
      match: [/[0-9]{9}/, "Student number should be 9 digits long number"],
      trim: true,
      sparse: true,
      required: "Student number is required",
    },
    firstName: {
      type: String,
      required: "First name is required",
    },
    lastName: {
      type: String,
      required: "Last name is required",
    },
    address: String,
    city: String,
    phoneNumber: String,
    program: {
      type: String,
      required: "Program name is required",
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Invalid email address"],
      required: "Email is required",
    },
    //courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    courses: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Course" },
        section: { type: String },
      },
    ],

    password: {
      type: String,
      required: "Password is required",
      validate: [
        (password) => password && password.length >= 6,
        "Password length should be at least 6",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// // Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
// studentSchema.set("toJSON", {
//   getters: true,
//   virtuals: true,
// });

studentSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
studentSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// let options = {
//   missingPasswordError: "wrong/missing password",
//   usernameField: "studentNumber",
// };
studentSchema.plugin(passportLocalMongoose);
mongoose.model("Student", studentSchema);
