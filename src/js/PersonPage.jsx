import { Link } from 'react-router';
import { Grid, Row, Col, PageHeader, Panel, Button, Alert } from 'react-bootstrap';
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
      },
      profileDeleted: false
    };
  },
  componentWillMount: function() {
    this.ref = new Firebase("https://people-directory.firebaseio.com/baptiste/" + this.props.params.id);
    this.ref.on('value', function(data) {

      this.setState({person: data.val()});

    }.bind(this));
  },
  removeProfile: function(e) {
    e.preventDefault();
    this.ref.remove();
    this.setState({profileDeleted: true});
  },
  render: function () {

    var content;
    if(this.state.profileDeleted) {
      content = <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <Alert bsStyle="success">
              Profile successfully removed.
            </Alert>
          </Col>
        </Row>
      </Grid>;
    } else {
      content = <Grid><Row className="text-center">
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
              <Button bsStyle="danger" onClick={this.removeProfile}>Delete profile</Button>
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
      </Row></Grid>;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});

export default PersonPage;
