import { default as Router, Route, Link, RouteHandler } from 'react-router';
import { Navbar, Nav, NavItem, Input, Grid, Row, Col, Thumbnail, PageHeader, Panel, ButtonInput, Alert, Button } from 'react-bootstrap';
import ScrollListenerMixin from 'react-scroll-components';
import React from 'react';
import Firebase from 'firebase';
import FirebaseUtil from 'firebase-util';
import EditPerson from './EditPerson.jsx';
import SearchBar from './SearchBar.jsx';
import AddPersonPage from './AddPersonPage.jsx';
import PersonListItem from './PersonListItem.jsx';
import Header from './Header.jsx';

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
