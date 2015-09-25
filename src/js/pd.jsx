var React = require('react');
var Router = require('react-router');
var peopleService = require('./data.js');

var Link = Router.Link;

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
      person: []
    };
  },
  componentDidMount: function() {
    peopleService.findById(this.props.params.id).done(function(person) {
      console.log(person);
      this.setState({
        person:person
      });
    }.bind(this));
  },
  render: function () {
    return (
      <section className="row">
        <h2>{this.state.person.firstName}</h2>
        <p>todo</p>
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
      console.log(people);
    }.bind(this));
  },
  render: function() {
    console.log('rendering homepage');
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

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// declare our routes and their hierarchy
var routes = (
  <Route handler={PeopleApp}>
    <Route path="/" handler={HomePage}/>
    <Route path="person/:id" handler={PersonPage}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
