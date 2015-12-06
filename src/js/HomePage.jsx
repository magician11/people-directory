import React from 'react';
import Firebase from 'firebase';
import SearchBar from './SearchBar.jsx';
import PeopleList from './PeopleList.jsx';

var HomePage = React.createClass({

  getInitialState: function() {
    return {
      people: {},
      searching: false
    };
  },
  handleUserInput: function(searchText, searchField) {

    this.setState({searching: true});

    var ref = new Firebase("https://people-directory.firebaseio.com/baptiste");
    ref.orderByChild(searchField).startAt(searchText).endAt(searchText + '\uf8ff').on("value", function(snapshot) {

      this.setState({
        people: snapshot.val(),
        searching: false
      });

    }.bind(this));

  },
  render: function() {

    var content;

    if(this.state.searching) {
      content = <div className="text-center">
        <h3><i className="fa fa-spin fa-3x fa-cog"></i><br/>Searching...</h3>
      </div>;
    } else if(this.state.people === null) {
      content = <h3 className="text-center">No results found.</h3>;
    } else if(Object.keys(this.state.people).length !== 0) {
      content = <PeopleList people={this.state.people} />;
    }

    return (
      <div>
        <SearchBar onUserInput={this.handleUserInput} />
        { content }
      </div>
    );
  }
});

export default HomePage;
