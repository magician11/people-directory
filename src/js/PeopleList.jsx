import React from 'react';
import PersonListItem from './PersonListItem.jsx';

var PeopleList = React.createClass({
  render: function () {

    var peopleList = [];

    for(var fbKey in this.props.people) {
      var person = this.props.people[fbKey];
      peopleList.push(<PersonListItem key={fbKey} firebaseKey={fbKey} person={person}/>);
    }

    return (
      <section className="people-list container">
        {peopleList}
      </section>
    );
  }
});

export default PeopleList;
