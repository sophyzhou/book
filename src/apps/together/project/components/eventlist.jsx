//
//
MyComponents.event = React.createClass({
  render(){
    return (
      <div className="card cyan darken-1">
        <div className="card-content white-text">
          <p>{this.props.event.eventName}</p>
        </div>
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
    var projectID = window.location.hash.substring(1);
    var url = "inbox.html#"+projectID
    return (
      <div className="row">

        <div className="col s3 m4">
          <div className="black-text center">
          <div className="card-content">
            <a href={url} target="_blank"><span className="card-title blue-grey-text"><h5>Add New Event</h5></span></a>
          </div>
            <h5>Event</h5>
          </div>
          {event}
        </div>


      </div>
    );
  }
}
MyComponents.EventList = EventList
