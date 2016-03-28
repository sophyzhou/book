MyComponents.event = React.createClass({
  render(){
    return (
      <div className="col s4">
        <ul className="collection">
          <li className="collection-item avatar teal lighten-1">
            <i className="material-icons circle white teal-text">event</i>
            <span className="title">{this.props.event.eventName}</span>
              <p><b>Location</b>: {this.props.event.location}<br/>
              <b>Date</b>: {this.props.event.eventDate}</p>
              <div className="secondary-content"><i className="material-icons white-text">close</i></div>
          </li>
        </ul>
      </div>
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
        {event}
      </div>
    );
  }
}

MyComponents.EventList = EventList