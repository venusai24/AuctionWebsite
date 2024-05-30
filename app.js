const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose")
const User = require("./model/User");
let app = express();
 
mongoose.connect("mongodb://localhost/27017");
 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Welcome to the Auction",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
//=====================
// ROUTES
//=====================
 
// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});
 
// Showing auction page
app.get("/auction", isLoggedIn, function (req, res) {
    res.render("auction");
});
 
// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});
 
// Handling user signup
app.post("/register", async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    });
   
    return res.status(200).json(user);
  });
 
//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});
 
//Handling user login
app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.render("auction");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});
 
//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});
 
 
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
 
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
