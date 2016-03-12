class App extends React.Component {
  render(){
    console.log("projs:"+this.props.data.projects)
    return(

    <div className="row">
      <MyComponents.NavBar actions={this.props.actions}/>
      <div className="row">
      <MyComponents.ProjView projs={this.props.data.projects}
      user={this.props.data.user}/>
      
    </div>
    </div>
    );
  }
}

MyComponents.App = App