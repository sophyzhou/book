MyComponents.task = React.createClass({
	render: function(){
		return(
		<div className="card-panel blue lighten-1">
			<div className="card-content">
      			<span className="card-title white-text"><h4>{this.props.task.taskName}</h4></span>
    	</div>
			<div className="card-action">
          <p>Assigned To: {this.props.task.assignedTo}</p>
          <p>Deadline: {this.props.task.deadline}</p>
					<p>Status: {this.props.task.taskStatus}</p>
					<p>Priority: {this.props.task.priority}</p>
					<p>Description: {this.props.task.taskDescription}</p>



      </div>
		</div>
		);
	}
});

class TaskList extends React.Component {
  render(){
  	var task = this.props.tasks.map(function(u, i){

  		return <MyComponents.task task={u} key={i} />
  	})
    return(
    <div className="col s10" >
		<div className="icon-block">
 		{task}
     </div>
    </div>
    );
  }
}

MyComponents.TaskList = TaskList
