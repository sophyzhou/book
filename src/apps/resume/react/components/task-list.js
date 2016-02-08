MyComponents.Task = React.createClass({

  render: function() {
    return (
        <li className="collection-item">
        <i className="tiny material-icons">work</i> <b> {this.props.task.title} </b>
        <br>Priority: {this.props.task.priority}</br>
        Deadline: {this.props.task.deadline} <br/>
        Type : {this.props.task.type}<br/>
        </li>
    );
  }
});

MyComponents.TaskList = React.createClass({
  render: function() {

    var incompletedTasks = [];
    var completedTasks = [];
    
    for( var key in this.props.tasks){
      if (this.props.tasks.hasOwnProperty(key)) {
        var task_i = this.props.tasks[key];
        if( task_i.assigned == "sophyzhou"){
          if( task_i.completed == false){
            var tmp = <MyComponents.Task task={task_i} key={key}/>
            incompletedTasks.push(tmp);
          }
          else if( task_i.completed == true){
            var tmp = <MyComponents.Task task={task_i} key={key}/>
            completedTasks.push(tmp)
          }
        }
      }
    }

    return (
      <div className="card black lighten-2">
        <div className="row">
          <div className="col s6">
            <div className="card black lighten-4">
              <div className="card-content white-text">
                <span className="card-title"><b>Incompleted Tasks</b></span>
                <ul className="collection black-text">
                {incompletedTasks}
                </ul>
              </div>
            </div>
          </div>
      
          <div className="col s6">
            <div className="card black lighten-4">
              <div className="card-content white-text">
                <span className="card-title"><b>Completed Tasks</b></span>
                <ul className="collection black-text">
                {completedTasks}
                </ul>
              </div>
            </div>
          </div>
      
        </div>
      </div>
    );
  }
});
