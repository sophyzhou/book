class App extends React.Component {
  render(){
    return(
    <div className="row">
      <MyComponents.NavBar actions={this.props.actions}/>
    </div>
    );
  }
}

MyComponents.App = App