import React from 'react';
import Firebase from 'firebase';
import { Input, Grid, Row, Col, ButtonInput, Alert } from 'react-bootstrap';

var EditPerson = React.createClass({

  getInitialState: function() {
    return {
      person: {
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        country: '',
        description: '',
        studioName: '',
        studioURL: '',
      },
      formSubmitted: false
    };
  },
  handleInputChange: function(e) {
    var nextState = this.state.person;
    nextState[e.target.name] = e.target.value;
    this.setState({person: nextState});
  },
  componentWillMount: function() {
    this.ref = new Firebase("https://people-directory.firebaseio.com/baptiste/" + this.props.params.id);
    this.ref.on('value', function(data) {

      this.setState({person: data.val()});

    }.bind(this));
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var person = {};

    // add all input refs to an object and save to database
    // Object.keys(this.refs).forEach(function(inputFieldRef) {
    //   person[inputFieldRef] = this.refs[inputFieldRef].getValue();
    // }.bind(this));
    console.log(this.state.person);
    //var ref = new Firebase("https://people-directory.firebaseio.com/baptiste");
    console.log('updating firebase');
    //console.log(this.ref);
    this.ref.set(this.state.person);
    this.ref.on('value', function(data) {

      console.log(data.val());

    });

    //
    // var fileReader = new FileReader();
    // fileReader.onload = function(e) {
    //
    //   person['image'] = e.target.result;
    //
    //   var ref = new Firebase("https://people-directory.firebaseio.com/baptiste");
    //   ref.push(person);
    //
    // };
    //
    // fileReader.readAsDataURL(this.refs['image'].getInputDOMNode().files[0]);

    this.setState({
      formSubmitted: true
    });
  },
  render: function() {

    if(!this.state.formSubmitted) {
      var form = <form onSubmit={this.handleSubmit}>
        <Input type="text" label="First Name" name="firstName" value={this.state.person.firstName} onChange={this.handleInputChange} required />
        <Input type="text" label="Last Name" name="lastName" value={this.state.person.lastName} onChange={this.handleInputChange} required />

        <Input type="text" label="City" value={this.state.person.city} name="city" onChange={this.handleInputChange} required />
        <Input type="text" label="State/Province" value={this.state.person.state} name="state" onChange={this.handleInputChange} required />
        <Input type="select" label="Country" value={this.state.person.country} name="country" onChange={this.handleInputChange} required >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Nigeria">Nigeria</option>
        </Input>
        <Input type="text" label="Studio" value={this.state.person.studioName} name="studioName" onChange={this.handleInputChange} required />
        <Input type="url" label="Studio Website" value={this.state.person.studioURL} name="studioURL" onChange={this.handleInputChange} required />
        <Input type="textarea" label="Description" value={this.state.person.description} name="description" onChange={this.handleInputChange} required />
        <ButtonInput type="submit" value="Save" bsStyle="primary" bsSize="large" className="center-block" />
      </form>;
    }

    if(this.state.formSubmitted) {
      var status = <Alert bsStyle="success">
        Person successfully updated!
      </Alert>;
    }

    return (
      <Grid>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h2>Edit a person</h2>
            {status}
            {form}
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default EditPerson;
