import React from 'react';
import { Input, Grid, Row, Col, ButtonInput, ButtonGroup, Button } from 'react-bootstrap';

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      searchText: this.props.searchText
    };
  },
  onSearchChange: function(e) {
    let searchVal = e.target.value;
    searchVal = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);
    this.setState({searchText: searchVal});
  },
  handleSearch: function(e) {
    e.preventDefault();
    this.props.onUserInput(this.state.searchText, 'firstName');
  },
  render: function () {
    // <input type="radio" name="searchField" value="lastName" id="lastName"><label for="lastName">Last Name</label>
    // <input type="radio" name="searchField" value="firstName" id="firstName" checked><label for="firstName">First Name</label>
    // <input type="radio" name="searchField" value="city" id="city"><label for="city">City</label>
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
              <Row>
                <Col xs={8} >
                  <ButtonGroup>
                    <Button active>
                      First name
                    </Button>
                    <Button>
                      Last name
                    </Button>
                    <Button>
                      City
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default SearchBar;
