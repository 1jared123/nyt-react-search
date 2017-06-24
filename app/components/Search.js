// Include React
var React = require("react");

// Here we include all of the sub-components
var GrandChild = require("./Grandchild");

//Api requests vars -------------------------------------------
//Our authentication key
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// queryURLBase begins the search
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// Create the Search Component
var Search = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  renderState: function() {
    // Logging the URL so we have access to it for troubleshooting
      console.log("------------------------------------");
      console.log("URL: " + queryURL);
      console.log("------------------------------------");

      // Log the NYTData to console, where it will show up as an object
      console.log(NYTData);
      console.log("------------------------------------");

      // Loop through and provide the correct number of articles
      for (var i = 0; i < numArticles; i++) {

        // Add to the Article Counter (to make sure we show the right number)
        articleCounter++;

        // Create the HTML well (section) and add the article content for each
        var wellSection = $("<div>");
        wellSection.addClass("well");
        wellSection.attr("id", "article-well-" + articleCounter);
        $("#well-section").append(wellSection);

        // Confirm that the specific JSON for the article isn't missing any details
        // If the article has a headline include the headline in the HTML
        if (NYTData.response.docs[i].headline !== "null") {
          $("#article-well-" + articleCounter)
            .append(
              "<h3 class='articleHeadline'><span class='label label-primary'>" +
              articleCounter + "</span><strong> " +
              NYTData.response.docs[i].headline.main + "</strong></h3>"
            );

          // Log the first article's headline to console
          console.log(NYTData.response.docs[i].headline.main);
        }

        // If the article has a byline include the headline in the HTML
        if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
          $("#article-well-" + articleCounter)
            .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

          // Log the first article's Author to console.
          console.log(NYTData.response.docs[i].byline.original);
        }

        // Then display the remaining fields in the HTML (Section Name, Date, URL)
        $("#articleWell-" + articleCounter)
          .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
        $("#articleWell-" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
        $("#articleWell-" + articleCounter)
          .append(
            "<a href='" + NYTData.response.docs[i].web_url + "'>" +
            NYTData.response.docs[i].web_url + "</a>"
          );

        // Log the remaining fields to console as well
        console.log(NYTData.response.docs[i].pub_date);
        console.log(NYTData.response.docs[i].section_name);
        console.log(NYTData.response.docs[i].web_url);
      }
    });
  }
  
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">

          <div className="panel panel-primary">

            <div className="panel-heading">
              <h3 className="panel-title">
                <strong><i className="fa fa-table" /> Top Articles</strong>
              </h3>
            </div>

            <div className="panel-body" id="well-section" />
          </div>
        </div>
      </div>;
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
