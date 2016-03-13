class App extends React.Component {
  render(){
    console.log("projs:"+this.props.data.projects)
    return(
    <div>
      <MyComponents.NavBar actions={this.props.actions}/>
      <div className="container">
        <MyComponents.User user={this.props.data.user}/>
        <MyComponents.ProjView projs={this.props.data.projects}
        user={this.props.data.user}/>
      </div>
    </div>
    );
  }
}

MyComponents.App = App