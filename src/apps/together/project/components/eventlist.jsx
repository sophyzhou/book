//
//
MyComponents.event = React.createClass({
  render(){
    return (
      <div className="col s3">
        <div className="card teal lighten-1">
          <div className="card-content white-text">
            <p>{this.props.event.eventName}</p>
          </div>
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
    var url = "addevent.html#"+projectID
    return (
      <div className="row">
        <div className="black-text center">
          <h5>EVENTS  <a href={url} target="_blank" className="btn-floating btn-medium waves-effect light-green darken-3"><i className="material-icons">add</i></a>
          </h5>
        </div>
        {event}
      </div>
    );
  }
}
MyComponents.EventList = EventList
