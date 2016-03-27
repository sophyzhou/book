class App extends React.Component {
  render(){
    return(
    <div>
      <MyComponents.TaskList tasks={this.props.data.tasks}/>
      <MyComponents.EventList events={this.props.data.events}/>
    </div>
    );
  }
}

MyComponents.App = App
