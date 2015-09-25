var Header = React.createClass({
  render: function () {
    return (
      <header className="contain-to-grid fixed">
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="/">{this.props.title}</a></h1>
            </li>
          </ul>
          <section className="top-bar-section">
            <ul className="right">
              <li><a href="#">Add Person</a></li>
            </ul>
          </section>
        </nav>
      </header>
    );
  }
});

var SearchBar = React.createClass({
  render: function () {
    return (
      <section className="row search-bar">
        <div className="small-8 small-offset-2 medium-offset-3 medium-6 columns">
          <fieldset>
            <legend>Search for someone...</legend>
            <input type="search" placeholder="Marilyn Monroe"/>
          </fieldset>
        </div>
      </section>
    );
  }
});

var PersonListItem = React.createClass({
  render: function () {
    return (
      <li className="text-center">
        <img src={'/assets/images/' + this.props.person.firstName.toLowerCase() + '-' + this.props.person.lastName.toLowerCase() + '.jpg'}/>
        <h3>{this.props.person.firstName} {this.props.person.lastName}</h3>
        <h6>{this.props.person.city}, {this.props.person.state} ({this.props.person.country})</h6>
      </li>
    );
  }
});

var PeopleList = React.createClass({
  render: function () {
    var peopleItems = this.props.people.map(function (person) {
      return (
        <PersonListItem key={person.id} person={person} />
      );
    });

    return (
      <ul className="small-block-grid-1 medium-block-grid-3">
        {peopleItems}
      </ul>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <footer className="row ">
        <div className="small-8 small-offset-2 columns text-center">
          <hr/>
          <p>Made by the team at <a href="http://www.sunbowl.ca/">sunbowl.ca</a></p>
        </div>
      </footer>
    );
  }
});

var PeopleApp = React.createClass({
  getInitialState: function() {
    return {
      people: [],
      searchText: ''
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.peopleDataUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({people: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.peopleDataUrl, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div>
        <Header title={this.props.title} />
        <SearchBar />
        <PeopleList people={this.state.people}/>
        <Footer/>
      </div>
    );
  }
});

React.render(<PeopleApp title="Baptiste Yoga Teacher Directory" peopleDataUrl='/assets/data/test-data.json'/>, document.body);
