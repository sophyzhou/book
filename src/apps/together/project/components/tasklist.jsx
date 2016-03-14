MyComponents.tasks = React.createClass({
  render: function(){

    return(
      <div className="card cyan darken-1">
      <div className="card-content white-text">
        <span className="card-title">Task Name Here</span>
      </div>
      </div>
    );
  }
});

//

class TaskList extends React.Component {
  render() {
    return (
      <div className="row">

        <div className="col s4 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Do</span>
              <MyComponents.tasks/>
            </div>
          </div>
        </div>

        <div className="col s4 m6">
          <div className="card darken-1">
            <div className="card-content black-text">
              <span className="card-title">Done</span>
              <MyComponents.tasks/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MyComponents.TaskList = TaskList