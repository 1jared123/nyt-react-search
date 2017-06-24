// Include React
var React = require("react");

// Here we include all of the sub-components
var Saved = require("./Saved");
var Search = require("./Search");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Counter to keep track of article numbers as they come in
var articleCounter = 0;
//-------------------------------------------------------------


// Create the Parent Component
var Parent = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return {
      articles: [],
    };
  },

  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    // The moment the page renders on page load, we will retrieve the previous click count.
    // We will then utilize that click count to change the value of the click state.
    helpers.getClicks()
      .then(function(response) {
        // Using a ternary operator we can set newClicks to the number of clicks in our response object
        // If we don't have any clicks in our database, set newClicks to 0
        var newClicks = response.data.length ? response.data[0].clicks : 0;
        this.setState({
          clicks: newClicks
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", newClicks);
      }.bind(this));
  },
  // Whenever our component updates, the code inside componentDidUpdate is run
  componentDidUpdate: function(prevState) {
    console.log("COMPONENT UPDATED");

    // We will check if the click count has changed...
    if (prevState.clicks !== this.state.clicks) {

      // If it does, then update the clickcount in MongoDB
      helpers.saveClicks({ clickID: this.state.clickID, clicks: this.state.clicks })
        .then(function() {
          console.log("Posted to MongoDB");
        });
    }
  },
  // Whenever the button is clicked we'll use setState to add to the clickCounter
  // Note the syntax for setting the state
  handleClick: function() {
    this.setState({ clicks: this.state.clicks + 1 });
  },


  runQuery: function(numArticles, queryURL) {

    var term = $("#search-term").val();

    var numberRecords = $("num-records-select").val();

    var startYear = $("start-year").val();

    var endYear = $("end-year").val();

    var queryURL = "http://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c6b6d232645147c99d22e7386777c49f&q=" + term + "&begin_date=" + startYear + "&end_date=" + endYear ;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(NYTData) {
        this.setState({ articles: NYTData })
    });

  },

  

  // Here we render the function
  render: function() {
    return (
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
          </div>

          <div className="row">
            <div className="col-sm-12">

              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
                </div>
                <div className="panel-body">


                  <form role="form">

                    <div className="form-group">
                      <label for="search">Search Term:</label>
                      <input type="text" className="form-control" id="search-term"></input>
                    </div>

                    <div className="form-group">
                      <label for="pwd">Number of Records to Retrieve:</label>
                      <select className="form-control" id="num-records-select">
                    <option value="1">1</option>
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                  </select>
                    </div>

                    <div className="form-group">
                      <label for="start-year">Start Year (Optional):</label>
                      <input type="text" className="form-control" id="start-year"></input>
                    </div>

                    <div className="form-group">
                      <label for="end-year">End Year (Optional):</label>
                      <input type="text" className="form-control" id="end-year"></input>
                    </div>

                    <button type="submit" className="btn btn-default" id="run-search" onClick={this.runQuery}><i className="fa fa-search"></i> Search</button>
                    <button type="button" className="btn btn-default" id="clear-all"><i className="fa fa-trash"></i> Clear Results</button>

                  </form>
                </div>
              </div>
            </div>
          </div>

          <Search articles= {this.state.articles}/>

          <Saved />  

                   
        </div>
    );
  }
});

module.exports = Parent;
