//
//
MyComponents.event = React.createClass({
  render(){
    return (
      <div className="col s3">
        <div className="card cyan darken-1">
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
    var url = "inbox.html#"+projectID
    return (
      <div className="row">
        <div className="row">
          <div className="black-text center">
            <h5>EVENTS</h5>
            <a href={url} target="_blank" className="btn-floating btn-medium waves-effect waves-light">
              <i className="material-icons">add</i>
            </a>
          </div>
          {event}
        </div>


      </div>
    );
  }
}
MyComponents.EventList = EventList
