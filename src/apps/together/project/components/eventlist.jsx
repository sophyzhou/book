MyComponents.event = React.createClass({
  render(){
    return (
    <li>
      <div className="collapsible-header teal lighten-1">{this.props.event.eventName}</div>
      <div className="collapsible-body black-text">
        <b>Event Date</b>: {this.props.event.eventDate}<br/>
        <b>Event location</b>: {this.props.event.location}
      </div>
    </li>
    );

  }
});


//
// Event List
//
class EventList extends React.Component {
  render() {
    var event = this.props.events.map(function(e, i){
      return <MyComponents.event event={e} key={i} />
    });

    return (
      <div className="row">
      <ul className="collapsible" data-collapsible="accordion">
        {event}
        </ul>
      </div>
    );
  }
  componentDidMount(){
  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false
    });
  });
}
}

MyComponents.EventList = EventList
