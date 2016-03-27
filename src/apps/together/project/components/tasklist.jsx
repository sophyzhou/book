//
// Task Status Classes - Do, Doing, Done
//
MyComponents.todo = React.createClass({
  render(){
    if (this.props.task.taskStatus == 0) return (
      <div className="card cyan darken-1">
        <div className="card-content white-text">
          <p>{this.props.task.taskName}</p>
        </div>
      </div>
    );
    else return (
      <div></div>
    );
  }
});

MyComponents.doing = React.createClass({
  render(){
    if (this.props.task.taskStatus == 1) return (
      <div className="card cyan darken-3">
      <div className="card-content white-text">
        <p>{this.props.task.taskName}</p>
      </div>
      </div>
    );
    else return (
      <div></div>
    );
  }
});

MyComponents.done = React.createClass({
  render(){
    if (this.props.task.taskStatus == 2) return (
      <div className="card blue-grey lighten-2">
      <div className="card-content white-text">
        <p>{this.props.task.taskName}</p>
      </div>
      </div>
    );
    else return (
      <div></div>
    );
  }
});

//
// Task List
//
class TaskList extends React.Component {
  render() {
    var todo = this.props.tasks.map(function(u, i){
      return <MyComponents.todo task={u} key={i} />
    });

    var doing = this.props.tasks.map(function(u, i){
      return <MyComponents.doing task={u} key={i} />
    });

    var done = this.props.tasks.map(function(u, i){
      return <MyComponents.done task={u} key={i} />
    });

    var projectID = window.location.hash.substring(1);
    var url = "addtask.html#"+projectID
    return (
      <div className="row">

        <div className="col s3 m4">
          <div className="black-text center">
            <a href={url} target="_blank"><span className="card-title blue-grey-text"><h5>Add New Task</h5></span></a>
            <h5>DO</h5>
          </div>
          {todo}
        </div>

        <div className="col s3 m4">
          <div className="black-text center">
            <h5>DOING</h5>
          </div>
          {doing}
        </div>

        <div className="col s3 m4">
          <div className="black-text center">
            <h5>DONE</h5>
          </div>
          {done}
        </div>

      </div>
    );
  }
}
MyComponents.TaskList = TaskList
