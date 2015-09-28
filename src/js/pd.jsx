import { default as Router, Route, Link, RouteHandler } from 'react-router';
import { Navbar, Nav, NavItem, Input, Grid, Row, Col, Thumbnail, PageHeader, Panel, ButtonInput, Alert } from 'react-bootstrap';

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require("firebase");

var Header = React.createClass({
  render: function () {
    return (
      <Navbar brand={<Link to='/'>{this.props.title}</Link>} inverse toggleNavKey={0}>
        <Nav right eventKey={0}>
          <NavItem eventKey={1} href="/#/">View Everyone</NavItem>
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
        src={this.props.person.image}
        alt={this.props.person.fname + ' ' + this.props.person.lname}
        className="text-center"
        key={this.props.key}
        >
        <h3>{this.props.person.fname} {this.props.person.lname}</h3>
        <p>{this.props.person.city}, {this.props.person.state} ({this.props.person.country})</p>
        <p><Link to={'/person/' + this.props.person['.key']}>view details &rarr;</Link></p>
      </Thumbnail>
    );
  }
});

var PeopleList = React.createClass({
  render: function () {

    var peopleList = [];

    this.props.people.forEach(function(person) {

      var fullName = person.fname + person.lname;

      if(fullName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      else {
        peopleList.push(<PersonListItem key={person['.key']} person={person}/>);
      }

    }.bind(this));

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
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      person: {
        fname: '',
        lname: '',
        description: ''
      }
    };
  },
  componentWillMount: function() {
    var ref = new Firebase("https://people-directory.firebaseio.com/" + this.props.params.id);
    this.bindAsObject(ref, "person");
  },
  render: function () {
    return (
      <Grid>
        <Row className="text-center">
          <PageHeader>{this.state.person.fname} {this.state.person.lname}</PageHeader>
        </Row>
        <Row>
          <Col md={4} className="text-center">
            <img className="img-circle person-thumbnail" src={this.state.person.image} />
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
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      people: [],
      filterText: ''
    };
  },
  componentWillMount: function() {
    var ref = new Firebase("https://people-directory.firebaseio.com/");
    this.bindAsArray(ref, "people");
  },
  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },
  render: function() {
    return (
      <div>
        <SearchBar onUserInput={this.handleUserInput} />
        <PeopleList people={this.state.people} filterText={this.state.filterText} />
      </div>
    );
  }
});

var AddPersonPage = React.createClass({
  getInitialState: function() {
    return {
      formSubmitted: false
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var person = {};

    // add all input refs to an object and save to database
    Object.keys(this.refs).forEach(function(inputFieldRef) {
      person[inputFieldRef] = this.refs[inputFieldRef].getValue();
    }.bind(this));

    var fileReader = new FileReader();
    fileReader.onload = function(e) {

      person['image'] = e.target.result;

      var ref = new Firebase("https://people-directory.firebaseio.com/");
      ref.push(person);

    };

    fileReader.readAsDataURL(this.refs['image'].getInputDOMNode().files[0]);

    this.setState({
      formSubmitted: true
    });

    return;
  },
  render: function() {

    if(!this.state.formSubmitted) {
      var form = <form onSubmit={this.handleSubmit}>
        <Input type="text" label="First Name" ref="fname" placeholder="Andrew" />
        <Input type="text" label="Last Name" ref="lname" placeholder="Golightly" />
        <Input type="file" label="Profile photo" help="Upload .jpg images only."  ref="image"/>
        <Input type="text" label="City" placeholder="Minneapolis" ref="city" />
        <Input type="text" label="State/Province" placeholder="NJ" ref="state" />
        <Input type="select" label="Country" ref="country" >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
        </Input>
        <Input type="text" label="Studio" placeholder="Power Yoga Canada" ref="studio" />
        <Input type="url" label="Studio Website" placeholder="http://www.poweryogacanada.com/" ref="studioUrl" />
        <Input type="textarea" label="Description" placeholder="Tell us about this person..." ref="description" />
        <ButtonInput type="submit" value="Add Person" bsStyle="primary" bsSize="large" className="center-block"/>
      </form>;
    }

    if(this.state.formSubmitted) {
      var status = <Alert bsStyle="success">
        Person successfully added!
      </Alert>;
    }

    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h2>Add a new person</h2>
            {status}
            {form}
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
