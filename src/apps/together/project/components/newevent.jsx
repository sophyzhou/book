class NewEvent extends React.Component {
  render() {
    var projectID = window.location.hash.substring(1);
    var url = "addevent.html#"+projectID
    return (
      <div className="black-text center">
      <h5>EVENTS  <a href={url} target="_blank" className="btn-floating btn-medium waves-effect light-green darken-3"><i className="material-icons">add</i></a>
      </h5>
    </div>
    );
  }
}
MyComponents.NewEvent = NewEvent
