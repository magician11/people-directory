import { default as Router, Route, Link, RouteHandler } from 'react-router';
import { Navbar, Nav, NavItem, Input, Grid, Row, Col, Thumbnail, PageHeader, Panel, ButtonInput } from 'react-bootstrap';

var React = require('react');
var $ = require('jquery');
var peopleService = require('./data.js');

var Header = React.createClass({
  render: function () {
    return (
      <Navbar brand={<Link to='/'>{this.props.title}</Link>} inverse toggleNavKey={0}>
        <Nav right eventKey={0}>
          <NavItem eventKey={1} href="/">View Everyone</NavItem>
          <NavItem eventKey={2} href="/#/add">Add Person</NavItem>
        </Nav>
      </Navbar>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function(e) {
    this.props.onUserInput(e.target.value);
  },
  render: function () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <Input type="search" bsSize="large" label="Search for someone..." placeholder="Marilyn Monroe" onChange={this.handleChange} />
          </Col>
        </Row>
      </Grid>
    );
  }
});

var PersonListItem = React.createClass({
  render: function () {
    return (
      <Thumbnail
        src={'/assets/images/' + this.props.person.firstName.toLowerCase() + '-' + this.props.person.lastName.toLowerCase() + '.jpg'}
        alt={this.props.person.firstName + ' ' + this.props.person.lastName}
        className="text-center"
        >
        <h3>{this.props.person.firstName} {this.props.person.lastName}</h3>
        <p>{this.props.person.city}, {this.props.person.state} ({this.props.person.country})</p>
        <p><Link to={'/person/' + this.props.person.id}>view details &rarr;</Link></p>
      </Thumbnail>
    );
  }
});

var PeopleList = React.createClass({
  render: function () {

    let peopleList = this.props.people.map(function(person) {
      return <PersonListItem key={person.id} person={person}/>;
    });

    return (
      <section className="people-list container">
        {peopleList}
      </section>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <footer className="container text-center">
        <hr/>
        <p>Made by the team at <a href="http://www.sunbowl.ca/">sunbowl.ca</a></p>
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
      <Grid>
        <Row className="text-center">
          <PageHeader>{this.state.person.firstName} {this.state.person.lastName}</PageHeader>
        </Row>
        <Row>
          <Col md={4} className="text-center">
            <img className="img-circle" src={'/assets/images/' + this.state.person.firstName.toLowerCase() + '-' + this.state.person.lastName.toLowerCase() + '.jpg'}/>
            <Row>
              <Col xs={10} xsOffset={1}>
                <Panel className="person-details">
                  <p><strong>Country:</strong> {this.state.person.country}</p>
                  <p><strong>City:</strong> {this.state.person.city}</p>
                  <p><strong>State/Province:</strong> {this.state.person.state}</p>
                  <p><strong>Studio:</strong> <a href={this.state.person.studioUrl}>{this.state.person.studio}</a></p>
                </Panel>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            {this.state.person.description.split('\n').map(function(paragraph, i) {
              return (
                <p key={i}>
                  {paragraph}
                  <br/>
                </p>
              )
            })}
          </Col>
        </Row>
      </Grid>
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

var AddPersonPage = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    alert('Todo: add this info to a databse');
  },
  render: function() {
    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h2>Add a new person</h2>
            <form onSubmit={this.handleSubmit}>
              <Input type="text" label="First Name" placeholder="Andrew" />
              <Input type="text" label="Last Name" placeholder="Golightly" />
              <Input type="file" label="Profile photo" help="Upload .jpg images only." />
              <Input type="text" label="City" placeholder="Minneapolis" />
              <Input type="text" label="State/Province" placeholder="NJ" />
              <Input type="select" label="Country">
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </Input>
              <Input type="text" label="Studio" placeholder="Power Yoga Canada" />
              <Input type="url" label="Studio Website" placeholder="http://www.poweryogacanada.com/" />
              <Input type="textarea" label="Description" placeholder="Tell us about this person..." />
              <ButtonInput type="submit" value="Add Person" bsStyle="primary" bsSize="large" className="center-block"/>
            </form>
          </Col>
        </Row>
      </Grid>
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
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
