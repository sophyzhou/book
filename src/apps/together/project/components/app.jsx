class App extends React.Component {
  render(){
    return(
    <div>
    <div>
      <MyComponents.EventList events={this.props.data.events}/>
    </div>
    <div>
      <MyComponents.TaskList tasks={this.props.data.tasks}/>
    </div>
    </div>


    );
  }
}

MyComponents.App = App
