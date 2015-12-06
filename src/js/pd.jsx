import { default as Router, Route, RouteHandler } from 'react-router';
import React from 'react';
import EditPerson from './EditPerson.jsx';
import AddPersonPage from './AddPersonPage.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PersonPage from './PersonPage.jsx';
import HomePage from './HomePage.jsx';

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
