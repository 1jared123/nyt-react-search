// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
    // title is a required string
    title: {
        type: String
    },
    // link is a required string
    date: {
        type: Date
    },
    // This saves many note ObjectId, ref refers to the Note model
    url: {
        type: String,
        unique: true
    }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;