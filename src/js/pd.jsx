var Header = React.createClass({
  render: function () {
    return (
      <div className="contain-to-grid fixed">
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="/">{this.props.title}</a></h1>
            </li>
          </ul>
        </nav>
        <SearchBar />
      </div>
    );
  }
});

var SearchBar = React.createClass({
  render: function () {
    return (
      <section className="row">
        <div className="small-4 small-offset-4 columns">
          <input type="search" placeholder="Search"/>
        </div>
      </section>
    );
  }
});

var PersonListItem = React.createClass({
  render: function () {
    return (
      <li className="text-center">
        <img src={'/assets/images/' + this.props.person.firstName.toLowerCase() + '-' + this.props.person.lastName.toLowerCase() + '.jpeg'}/>
        <h3>{this.props.person.firstName} {this.props.person.lastName}</h3>
        <h6>{this.props.person.city}, {this.props.person.state}</h6>
      </li>
    );
  }
});

var PeopleList = React.createClass({
  render: function () {
    var peopleItems = this.props.people.map(function (person) {
      return (
        <PersonListItem person={person} />
      );
    });
    return (
      <ul className="medium-block-grid-3">
        {peopleItems}
      </ul>
    );
  }
});

var PeopleApp = React.createClass({
  render: function () {
    return (
      <div>
        <Header title={this.props.title} />
        <PeopleList people={this.props.people}/>
      </div>
    );
  }
});

people = [
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.<br/>In her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.<br/>While not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"}
];

React.render(<PeopleApp title="Yoga Teacher Directory" people={people}/>, document.body);
