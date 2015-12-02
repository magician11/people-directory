import React from 'react';
import { Link } from 'react-router';
import { Thumbnail } from 'react-bootstrap';

var PersonListItem = React.createClass({
  render: function () {

    return (
      <Thumbnail
        src={this.props.person.image}
        alt={this.props.person.firstName + ' ' + this.props.person.lastName}
        className="text-center"
        key={this.props.firebaseKey}
        >
        <h3>{this.props.person.firstName} {this.props.person.lastName}</h3>
        <p>{this.props.person.city}, {this.props.person.state} ({this.props.person.country})</p>
        <p><Link to={'/person/' + this.props.firebaseKey}>view details &rarr;</Link></p>
      </Thumbnail>
    );
  }
});

export default PersonListItem;
