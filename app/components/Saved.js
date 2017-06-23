// Include React
var React = require("react");

// Create the Saved Component
var Saved = React.createClass({

  // Saved has a state that follows the number of clicks
  getInitialState: function() {
    return {
      number: 0
    };
  },
  render: function() {
    return (
      <div className="row">
            <div className="col-sm-12">

              <h5 className="text-center"><small>Made by Ahmed with lots and lots of <i className="fa fa-heart"></i></small></h5>

            </div>
          </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
