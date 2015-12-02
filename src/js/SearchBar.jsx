import React from 'react';
import { Input, Grid, Row, Col, ButtonInput } from 'react-bootstrap';

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
    e.preventDefault();
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

export default SearchBar;
