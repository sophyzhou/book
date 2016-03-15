class App extends React.Component {
  render(){
  	console.log("task in app:")
    console.log(this.props.data.tasks)
    return(
    <div>
      <MyComponents.TaskList tasks={this.props.data.tasks}/>
    </div>
    );
  }
}

MyComponents.App = App