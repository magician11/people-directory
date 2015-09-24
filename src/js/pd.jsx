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
            <input type="search" placeholder="Andrew Golightly"/>
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
        <h6>{this.props.person.city}, {this.props.person.state}</h6>
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

var TestBlock = React.createClass({
  doStuff: function(event) {
    console.log(JSON.stringify(event.target.value));
  },
  render: function () {
    return (
      <textarea placeholder="type stuff in me" onChange={this.doStuff}/>
    );
  }
});

var PeopleApp = React.createClass({
  getInitialState: function() {
    return {
      people: []
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
      </div>
    );
  }
});

people = [
  {"id": 1, "firstName": "Lisa", "lastName": "Duffy", "description": "Lisa found yoga after suffering a running injury.  After many years of running, she discovered that Baptiste Power Vinyasa offered her a sweaty, physical asana practice combined with a re-awakening in her mind.  She discovered a strengthened mind body connection that can be applied not only on the mat but in her life.  The more time she spent on her mat, the more shifts she realized off her mat.\nIn her teaching, Lisa encourages and challenges her students, creating opportunities for them to drop the limits that block them from transformation on and off their mats.  Lisa believes that everyone on this earth is powerful and amazing, sometimes the awareness gets hidden in daily life but the Baptiste practice allows you to uncover your power and focus on your strengths.\nWhile not at Anjali Power yoga, or teaching yoga to local school teams, Lisa keeps busy with her husband, 3 children and various pets (currently 4 cats and 2 dogs) or is out training for the racing season.", "city": "Westmont", "state": "NJ", "country": "USA", "studio": "Anjali Power Yoga", "studioUrl": "http://www.anjalipoweryoga.com/"},
  {"id": 2, "firstName": "Nicole", "lastName": "Sargent", "description": "All of my life I had been a planner, but what I have experienced as my life has unfolded, is that often, the most wonderful things along the way were not planned but happened when I relaxed and stopped trying so hard. That’s how I finally saw the love of my life who had been standing in front of me the whole time, and how I left a career in social work to pursue my passion for all things yoga! Power Yoga Canada and Baptiste Yoga came into my life, rocked my world, and showed me ease, freedom and endless possibilities.\nI can still clearly remember my very first experience at a yoga class, I don’t recall what poses we did, or the teacher’s name, but I remember vividly the feeling I was left with afterwards. Sitting in my car, I recall thinking how amazing I felt, not only physically rinsed out, but my busy mind was clear, and I was full of joy, I thought I need more of this! And from that moment on, I had fallen madly & deeply in love with this practice.\nThat was 7 years ago, and since then I haven’t looked back! Since joining the Power Yoga Canada team in 2009, I have kept the flame of my love affair alive by completing Level 1 & Level 2 teacher trainings with Baron Baptiste, as well as the Baptiste Power Flow Immersion in Colorado, and most recently, the Art of Assisting.\nMy Baptiste yoga practice continues to amaze me with its ability to meet me exactly where I am, and to give me exactly what I need in the moment. I love hitting my mat, feeling the physical practice and breath draw me out of my head, into my body, and into a sense of wholeness and complete acceptance. All of my planning and trying in my life and on my mat had left me feeling as though I was banging my head against a brick wall, but my practice gave me the concrete tools of breath and of finding ease in the most uncomfortable situations (and poses!).\n am so grateful and excited to be a part of the Baptiste community as a Certified Teacher, indeed; this is a life that I never could have planned out in my wildest dreams. I can’t wait to see YOU on your mat, and to share my love of this practice and community with you!", "city": "Mississauga", "state": "ON", "country": "CAN", "studio": "Power Yoga Canada", "studioUrl": "http://www.poweryogacanada.com/"},
  {"id": 3, "firstName": "Sandra", "lastName": "Godley", "description": "Yoga lights me up! I found my way to Baptiste Yoga around 7 years ago. It was the perfect timing because I was going through a difficult period in my life. I decided to take the 40 days program. Ever since my life has been completely altered in the best kind of way!\nAfter several years of practicing Baptiste Yoga I felt inspired to become and teacher in order to give back. I did my 200 hour teacher training at Yoga One and I have been on fire ever since! After that I completed Levels 1, 2 and 3 with Baron Baptiste in the next year. Teaching yoga has been a huge gift for me. What lights you up?!", "city": "Charlotte", "state": "NC", "country": "USA", "studio": "Yoga One", "studioUrl": "http://www.y1now.com/"}
];

React.render(<PeopleApp title="Yoga Teacher Directory" peopleDataUrl='/assets/data/test-data.json'/>, document.body);
