//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var logger = require("morgan");


var router = express();
var PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;


//Serve static content from public directory
router.use(express.static(process.cwd() + "/public"));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

router.use(logger("dev"));
router.use(bodyParser.urlencoded({
  extended: false
}));

var Article = require("../models/Article.js");

//here the connection to mongodb for heroku.
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


//Setting up Handlebars
// var exphbs = require("express-handlebars");

// //Adding Partial Directory
// var hbs = exphbs.create({
//     defaultLayout: "main",
//     partialsDir: ["views/partials/"]
// });

// router.engine("handlebars", hbs.engine);
// router.set("view engine", "handlebars");

// Main route (simple Hello World Message)
router.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Retrieve data from the db
router.get("/api/saved", function(req, res) {
  // This GET request will search for the latest clickCount
  Article.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

//get the comments linked to an article
router.post("/api/saved", function(req, res) {
  Article.findOne({"_id":req.params.id}).populate("note").exec(function(error, work) {
    if (error) {
      res.send(error);
    }
    else {
      res.json(work);
    }
  })

});

//remove a comment
router.delete("/api/saved", function(req, res) {
  Note.findOneAndRemove({ "_id":req.params.id}, function(err, todo) {
    var response = {
      message: "Comment successfully deleted",
      id: todo._id
    }
     res.send("done")
  })

});


router.listen(PORT, function() {
    console.log("Server Operational - Listening to Port " + PORT);
});


