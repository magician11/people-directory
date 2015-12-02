import React from 'react';
import { Input, Grid, Row, Col, ButtonInput } from 'react-bootstrap';

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
          <option value="Nigeria">Nigeria</option>
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

export default AddPersonPage;
