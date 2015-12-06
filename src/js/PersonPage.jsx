import { Link } from 'react-router';
import { Grid, Row, Col, PageHeader, Panel, Button } from 'react-bootstrap';
import React from 'react';
import Firebase from 'firebase';

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
                <Button bsStyle="info"><Link to={'/edit/' + this.props.params.id}>Edit profile</Link></Button>
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

export default PersonPage;
