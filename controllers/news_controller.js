//Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");

mongoose.Promise = Promise;


var Article = require("../models/Article.js");

router.use(logger("dev"));
router.use(bodyParser.urlencoded({
  extended: false
}));

// Initialize Express
var router = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

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

// Main route (simple Hello World Message)
router.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Retrieve data from the db
router.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  Article.find({}, function(error, results) {
      if (error) {
        res.send(error);
      }
      else {
        res.render("dashboard", { article: results });
      }
    })
});

//get the comments linked to an article
router.get("/articles/:id", function(req, res) {
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
router.post("/remove/:id", function(req, res) {
  Note.findOneAndRemove({ "_id":req.params.id}, function(err, todo) {
    var response = {
      message: "Comment successfully deleted",
      id: todo._id
    }
     res.send("done")
  })

})


//save a comment to an article.
router.post("/articles/:id", function(req, res) {

  var newNote = new Note(req.body);

// Save the new book in the books collection
  newNote.save(function(err, doc) {
    // Send an error to the browser if there's something wrong
    if (err) {
      console.log(err);
    }
    // Otherwise...
    else {
        Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { "note": doc._id } }, { new: true }).exec(function(error, doc) {
        // Send any errors to the browser
        if (error) {
          res.send(error);
        }
        // Or send the doc to the browser
        else {
          res.send(doc);
        }
      });
    }
  });

});



module.exports = router;