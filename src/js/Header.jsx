import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem  } from 'react-bootstrap';

var Header = React.createClass({
  render: function () {
    return (
      <Navbar brand={<Link to='/'>{this.props.title}</Link>} inverse toggleNavKey={0}>
        <Nav right eventKey={0}>
          <NavItem eventKey={1} href="/#/add">Add Person</NavItem>
        </Nav>
      </Navbar>
    );
  }
});

export default Header;
