handleChange: function(event) {
        console.log("something changed");

        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },

    handleSubmit: function(event) {
        event.preventDefault();
        console.log("clicked");
        this.props.updateSearch(this.state.search, this.state.start, this.state.end);
    },

    render: function() {

    }