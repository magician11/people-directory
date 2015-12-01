import { default as Router, Route, Link, RouteHandler } from 'react-router';
import { Navbar, Nav, NavItem, Input, Grid, Row, Col, Thumbnail, PageHeader, Panel, ButtonInput, Alert, Button } from 'react-bootstrap';
import ScrollListenerMixin from 'react-scroll-components';
import React from 'react';
import Firebase from 'firebase';
import FirebaseUtil from 'firebase-util';
import EditPerson from './EditPerson.jsx';

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
  getInitialState: function() {
    return {
      searchText: this.props.searchText
    };
  },
  onSearchChange: function(e) {
    this.setState({searchText:e.target.value});
  },
  handleSearch: function(e) {
    this.props.onUserInput(this.state.searchText, 'lastName');
  },
  render: function () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <form onSubmit={this.handleSearch}>
              <Row>
                <Col xs={8} >
                  <Input type="search" bsSize="large" placeholder="Marilyn Monroe" onChange={this.onSearchChange} value={this.state.searchText}/>
                </Col>
                <Col xs={4} >
                  <ButtonInput type="submit" value="Search" bsStyle="primary" bsSize="large" />
                </Col>
              </Row>
            </form>
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
        alt={this.props.person.firstName + ' ' + this.props.person.lastName}
        className="text-center"
        key={this.props.firebaseKey}
        >
        <h3>{this.props.person.firstName} {this.props.person.lastName}</h3>
        <p>{this.props.person.city}, {this.props.person.state} ({this.props.person.country})</p>
        <p><Link to={'/person/' + this.props.firebaseKey}>view details &rarr;</Link></p>
      </Thumbnail>
    );
  }
});

var PeopleList = React.createClass({
  render: function () {

    var peopleList = [];

    console.log('Rendering people');
    console.log(this.props.people);

    for(var fbKey in this.props.people) {

      var person = this.props.people[fbKey];

      //    var fullName = person.firstName + person.lastName;

      //  if(fullName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
      peopleList.push(<PersonListItem key={fbKey} firebaseKey={fbKey} person={person}/>);
      //  }
    }

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
      person: {
        firstName: '',
        middleNames: '',
        lastName: '',
        description: ''
      }
    };
  },
  componentWillMount: function() {
    this.ref = new Firebase("https://people-directory.firebaseio.com/baptiste/" + this.props.params.id);
    this.ref.on('value', function(data) {

      this.setState({person: data.val()});

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
            <img className="img-circle person-thumbnail" src={this.state.person.image} />
            <Row>
              <Col xs={10} xsOffset={1}>
                <Panel className="person-details">
                  <p><strong>Country:</strong> {this.state.person.country}</p>
                  <p><strong>City:</strong> {this.state.person.city}</p>
                  <p><strong>State/Province:</strong> {this.state.person.state}</p>
                  <p><strong>Studio:</strong> <a href={this.state.person.studioURL}>{this.state.person.studioName}</a></p>
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
            <p><Link to={'/edit/' + this.props.params.id}>Edit</Link></p>
          </Col>
        </Row>
      </Grid>
    );
  }
});

var HomePage = React.createClass({

  getInitialState: function() {
    return {
      people: {}
    };
  },
  // componentWillMount: function() {
  //
  //   var ref = new Firebase.util.Scroll(new Firebase("https://people-directory.firebaseio.com/baptiste"), 'lastName');
  //   ref.on('child_added', function(data) {
  //
  //     var peopleList = this.state.people;
  //     peopleList[data.key()] = data.val();
  //     console.log('Adding ' + data.val().firstName);
  //     this.setState({people: peopleList});
  //
  //   }.bind(this));
  //
  //   ref.scroll.next(9);
  //
  //   setTimeout(function(){
  //     ref.scroll.next(9);
  //   }, 8000);
  //
  // },
  // onPageScroll: function(scrollPosition) {
  //   console.log('Currently at position: ' + scrollPosition);
  // },
  handleUserInput: function(searchText, searchField) {

    console.log('Doing a search for ' + searchText + ' in the field ' + searchField);

    var ref = new Firebase("https://people-directory.firebaseio.com/baptiste");
    ref.orderByChild(searchField).startAt(searchText).endAt(searchText + '\uf8ff').on("value", function(snapshot) {

      this.setState({
        people: snapshot.val()
      });
    }.bind(this));

  },
  render: function() {

    var content;

    console.log(this.state.people);

    if(Object.keys(this.state.people).length === 0) {
      content = <h3 className="text-center">Begin by searching above.</h3>;
      }
      else {
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

        var ref = new Firebase("https://people-directory.firebaseio.com/baptiste");
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
          <Input type="text" label="First Name" ref="firstName" placeholder="Andrew" required />
          <Input type="text" label="Last Name" ref="lastName" placeholder="Golightly" required />
          <Input type="file" label="Profile photo" accept="image/*" ref="image" required />
          <Input type="text" label="City" placeholder="Minneapolis" ref="city" required />
          <Input type="text" label="State/Province" placeholder="NJ" ref="state" required />
          <Input type="select" label="Country" ref="country" required >
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </Input>
          <Input type="text" label="Studio" placeholder="Power Yoga Canada" ref="studioName" required />
          <Input type="url" label="Studio Website" placeholder="http://www.poweryogacanada.com/" ref="studioURL" required />
          <Input type="textarea" label="Description" placeholder="Tell us about this person..." ref="description" required />
          <ButtonInput type="submit" value="Add Person" bsStyle="primary" bsSize="large" className="center-block" />
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
      // <Route path="edit/:id" handler={EditPerson}/>
    </Route>
  );

  Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
  });
