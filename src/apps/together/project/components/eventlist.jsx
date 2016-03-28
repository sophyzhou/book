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
    
    return (
      <div className="row">
        {event}
      </div>
    );
  }
}
MyComponents.EventList = EventList
