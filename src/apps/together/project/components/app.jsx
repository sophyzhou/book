class App extends React.Component {
  render(){
    return(
    <div>
      <MyComponents.TaskList tasks={this.props.data.tasks}/>
    </div>
    );
  }
}

MyComponents.App = App