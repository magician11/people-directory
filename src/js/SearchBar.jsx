import React from 'react';
import { Input, Grid, Row, Col, ButtonInput, ButtonGroup, Button } from 'react-bootstrap';

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      searchText: this.props.searchText,
      searchField: 'firstName'
    };
  },
  changeSearchField: function(e) {
    this.setState({searchField: e.target.name});
  },
  onSearchChange: function(e) {
    let searchVal = e.target.value;
    searchVal = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);
    this.setState({searchText: searchVal});
  },
  handleSearch: function(e) {
    e.preventDefault();
    this.props.onUserInput(this.state.searchText, this.state.searchField);
  },
  render: function () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <form onSubmit={this.handleSearch}>
              <Row>
                <Col xs={8} >
                  <Input type="search" bsSize="large" onChange={this.onSearchChange} value={this.state.searchText}/>
                </Col>
                <Col xs={4} >
                  <ButtonInput type="submit" value="Search" bsStyle="primary" bsSize="large" />
                </Col>
              </Row>
              <Row>
                <Col xs={8} >
                  <ButtonGroup>
                    <Button active={this.state.searchField === 'firstName'} onClick={this.changeSearchField} name="firstName">
                      First name
                    </Button>
                    <Button active={this.state.searchField === 'lastName'} onClick={this.changeSearchField} name="lastName">
                      Last name
                    </Button>
                    <Button active={this.state.searchField === 'state'} onClick={this.changeSearchField} name="state">
                      State
                    </Button>
                    <Button active={this.state.searchField === 'country'} onClick={this.changeSearchField} name="country">
                      Country
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
