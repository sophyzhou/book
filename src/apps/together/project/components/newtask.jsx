class NewTask extends React.Component {
  render() {
    var projectID = window.location.hash.substring(1);
    var url = "addtask.html#"+projectID
    return (
      <div className="black-text center">
        <h5>TASKS <a href={url} target="_blank" className="btn-floating btn-medium waves-effect waves-light light-green darken-3"><i className="material-icons">add</i></a></h5>
      </div>
    );
  }
}
MyComponents.NewTask = NewTask
