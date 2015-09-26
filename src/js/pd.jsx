// import { Router, Route, Link, RouteHandler } from 'react-router';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;
var peopleService = require('./data.js');

var Header = React.createClass({
  render: function () {
    return (
      <header className="contain-to-grid fixed">
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="/">{this.props.title}</a></h1>
            </li>
          </ul>
          <section className="top-bar-section">
            <ul className="right">
              <li><a href="#">Add Person</a></li>
            </ul>
          </section>
        </nav>
      </header>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function(e) {
    this.props.onUserInput(e.target.value);
  },
  render: function () {
    return (
      <section className="row search-bar">
        <div className="small-8 small-offset-2 medium-offset-3 medium-6 columns">
          <fieldset>
            <legend>Search for someone...</legend>
            <input type="search" placeholder="Marilyn Monroe" onChange={this.handleChange} value={this.props.filterText}/>
          </fieldset>
        </div>
      </section>
    );
  }
});

var PersonListItem = React.createClass({
  render: function () {
    return (
      <li className="text-center">
        <Link to={'/person/' + this.props.person.id}>
          <img src={'/assets/images/' + this.props.person.firstName.toLowerCase() + '-' + this.props.person.lastName.toLowerCase() + '.jpg'}/>
          <h3>{this.props.person.firstName} {this.props.person.lastName}</h3>
        </Link>
        <h6>{this.props.person.city}, {this.props.person.state} ({this.props.person.country})</h6>
      </li>
    );
  }
});

var PeopleList = React.createClass({
  render: function () {

    var peopleItems = this.props.people.map(function (person) {
      return (
        <PersonListItem key={person.id} person={person}/>
      );
    });

    return (
      <ul className="small-block-grid-1 medium-block-grid-3">
        {peopleItems}
      </ul>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <footer className="row ">
        <div className="small-8 small-offset-2 columns text-center">
          <hr/>
          <p>Made by the team at <a href="http://www.sunbowl.ca/">sunbowl.ca</a></p>
        </div>
      </footer>
    );
  }
});

var PersonPage = React.createClass({
  getInitialState: function() {
    return {
      person: {}
    };
  },
  componentWillMount: function() {
    peopleService.findById(this.props.params.id).done(function(person) {
      this.setState({
        person:person
      });
    }.bind(this));
  },
  render: function () {
    return (
      <section className="row person-view">
        <div className="medium-4 columns">
          <img src={'/assets/images/' + this.state.person.firstName.toLowerCase() + '-' + this.state.person.lastName.toLowerCase() + '.jpg'}/>
          <div className="person-details">
            <p><strong>Country:</strong> {this.state.person.country}</p>
            <p><strong>City:</strong> {this.state.person.city}</p>
            <p><strong>State/Province:</strong> {this.state.person.state}</p>
            <p><strong>Studio:</strong> <a href={this.state.person.studioUrl}>{this.state.person.studio}</a></p>
          </div>
        </div>

        <div className="medium-8 columns">
          <h2>{this.state.person.firstName} {this.state.person.lastName}</h2>
          {this.state.person.description.split('\n').map(function(paragraph, i) {
            return (
              <p key={i}>
                {paragraph}
                <br/>
              </p>
            )
          })}
        </div>
      </section>
    );
  }
});

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      people: [],
      filterText: ''
    };
  },
  handleUserInput: function(filterText) {
    peopleService.findByName(filterText).done(function(people) {
      this.setState({
        people:people,
        filterText: filterText
      });
    }.bind(this));
  },
  componentDidMount: function() {
    peopleService.init().done(function(people) {
      this.setState({
        people:people
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <SearchBar onUserInput={this.handleUserInput} filterText={this.props.filterText}/>
        <PeopleList people={this.state.people} filterText={this.props.filterText}/>
      </div>
    );
  }
});

var PeopleApp = React.createClass({
  render: function () {
    return (
      <div>
        <Header title='Baptiste Yoga Teacher Directory' />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
});

// var Route = Router.Route;
// var RouteHandler = Router.RouteHandler;

// declare our routes and their hierarchy
var routes = (
  <Route handler={PeopleApp}>
    <Route path="/" handler={HomePage}/>
    <Route path="person/:id" handler={PersonPage}/>
  </Route>
);

ReactRouter.run(routes, ReactRouter.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
