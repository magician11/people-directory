import React from 'react';
import Firebase from 'firebase';

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
    Object.keys(this.refs).forEach(function(inputFieldRef) {
      person[inputFieldRef] = this.refs[inputFieldRef].getValue();
    }.bind(this));

    //var ref = new Firebase("https://people-directory.firebaseio.com/baptiste");
    this.ref.update(person);

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

    return;
  },
  render: function() {

    if(!this.state.formSubmitted) {
      var form = <form onSubmit={this.handleSubmit}>
        <Input type="text" label="First Name" ref="firstName" value={this.state.person.firstName} required />
        <Input type="text" label="Last Name" ref="lastName" value={this.state.person.lastName} required />
        <Input type="file" label="Profile photo" accept="image/*" ref="image" required />
        <Input type="text" label="City" value={this.state.person.city} ref="city" required />
        <Input type="text" label="State/Province" value={this.state.person.state} ref="state" required />
        <Input type="select" label="Country" value={this.state.person.country} required >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Nigeria">Nigeria</option>
        </Input>
        <Input type="text" label="Studio" value={this.state.person.studioName} ref="studioName" required />
        <Input type="url" label="Studio Website" value={this.state.person.studioURL} ref="studioURL" required />
        <Input type="textarea" label="Description" value={this.state.person.description} ref="description" required />
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
