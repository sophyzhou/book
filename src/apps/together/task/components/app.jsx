class App extends React.Component {
  render(){
    console.log(this.props.data)
    return(

    <div className="row">
      <MyComponents.NavBar actions={this.props.actions}/>
    <div className="row">
      <MyComponents.TaskList tasks={this.props.data.tasks}/>
    </div>
    </div>
    );
  }
}

MyComponents.App = App
