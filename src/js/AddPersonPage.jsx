import React from 'react';
import { Input, Grid, Row, Col, ButtonInput, Alert } from 'react-bootstrap';
import $ from 'jquery';

var AddPersonPage = React.createClass({
  getInitialState: function() {
    return {
      formSubmitted: false,
      countryData: []
    };
  },
  componentDidMount: function() {
    $.get('https://cdn.rawgit.com/mledoze/countries/master/dist/countries.json', function(allCountryData) {
      let newCountryData = [];
      allCountryData.forEach(function(country) {
        newCountryData.push({name: country.name.common, code: country.cca3});
      });

      newCountryData.sort(function(a, b) {
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
      });

      this.setState({countryData: newCountryData});
    }.bind(this));
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
      person['listInDirectory'] = {baptiste: true};

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
        <Input type="text" label="State/Province" placeholder="NJ" ref="state" />
        <Input type="select" label="Country" ref="country" required >
          {this.state.countryData.map(function(country){
            return <option value={country.code} key={country.code}>{country.name}</option>;
            })}
        </Input>
        <Input type="text" label="Studio" placeholder="Power Yoga Canada" ref="studioName" />
        <Input type="url" label="Studio Website" placeholder="http://www.poweryogacanada.com/" ref="studioURL" />
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
