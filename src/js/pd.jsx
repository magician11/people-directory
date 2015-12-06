import { default as Router, Route, Link, RouteHandler } from 'react-router';
import { Navbar, Nav, NavItem, Input, Grid, Row, Col, Thumbnail, PageHeader, Panel, ButtonInput, Alert, Button } from 'react-bootstrap';
import React from 'react';
import Firebase from 'firebase';
import FirebaseUtil from 'firebase-util';
import EditPerson from './EditPerson.jsx';
import SearchBar from './SearchBar.jsx';
import AddPersonPage from './AddPersonPage.jsx';
import PeopleList from './PeopleList.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PersonPage from './PersonPage.jsx';


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


var PeopleApp = React.createClass({
  render: function () {
    return (
      <div>
        <Header title='Baptiste Yoga Teachers' />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={PeopleApp}>
    <Route path="/" handler={HomePage}/>
    <Route path="person/:id" handler={PersonPage}/>
    <Route path="add" handler={AddPersonPage}/>
    <Route path="edit/:id" handler={EditPerson}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
