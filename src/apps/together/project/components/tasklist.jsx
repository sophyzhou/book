MyComponents.task = React.createClass({
  render(){
    return(
      <div className="card cyan darken-1">
      <div className="card-content white-text">
        <span className="card-title">{this.props.task.taskName}</span>
      </div>
      </div>
    );
  }
});

//

class TaskList extends React.Component {
  render() {
    var task = this.props.tasks.map(function(u, i){
      console.log("Inside tasklist")
      console.log(u)
      console.log(i)
      return <MyComponents.task task={u} key={i} />
    })


    return (
      <div className="row">

        <div className="col s4 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Do</span>
              {task}
            </div>
          </div>
        </div>

        <div className="col s4 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Done</span>
              {task}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MyComponents.TaskList = TaskList
