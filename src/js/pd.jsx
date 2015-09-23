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
      </div>
    );
  }
});

var SearchBar = React.createClass({
  render: function () {
    return (
      <section className="row">
        <input type="search"></input>
      </section>
    );
  }
});

var PeopleApp = React.createClass({
  render: function () {
    return (
      <div>
        <Header title={this.props.title}></Header>
        <SearchBar></SearchBar>
      </div>
    );
  }
});

React.render(<PeopleApp title="Yoga Teacher Directory"/>, document.body);
