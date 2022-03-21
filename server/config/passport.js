// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

// load up the user model
var User = require("mongoose").model("Student");

// expose this function to our app using module.exports
module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "studentNumber",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, studentNumber, password, done) => {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({ studentNumber: studentNumber }, (err, user) => {
            // if there are any errors, return the error
            if (err) return done(err);

            // check to see if theres already a user with that email
            if (user) {
              return done(null, false, {
                message: "Student number already registered",
              });
            } else {
              // if there is no user with that email
              // create the user
              var newUser = new User(req.body);
              //console.log(req.body);
              //console.log(newUser);

              // set the user's local credentials
              //newUser.studentNumber = studentNumber;
              newUser.password = newUser.generateHash(password);

              // save the user
              newUser.save((err) => {
                //console.log("inside save");
                if (err) return done(err);
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "studentNumber",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, studentNumber, password, done) => {
        // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ studentNumber: studentNumber }, (err, user) => {
          // if there are any errors, return the error before anything else
          if (err) return done(err);

          // if no user is found, return the message
          if (!user)
            return done(null, false, { message: "Invalid student number" }); // req.flash is the way to set flashdata using connect-flash

          // if the user is found but the password is wrong
          if (!user.validPassword(password))
            return done(null, false, { message: "Wrong password" }); // create the loginMessage and save it to session as flashdata

          // all is well, return successful user
          console.log(user);
          return done(null, user, { message: "Successfully authenticated" });
        });
      }
    )
  );
};
