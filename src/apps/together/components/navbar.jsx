class NavBar extends React.Component {

  render(){
    // actions.logged set appropriately in the data.jsx file
    if(this.props.actions.logged==true) {
    return (
      <nav>
        <div className="nav-wrapper cyan darken-3">
          <ul className="left">
            <li><a href="/">Home</a></li>
          </ul>
          <a href="index.html" className="brand-logo center">Prolanner</a>
          <ul id="nav-mobile" className="right">
            <li><a href="#" onClick={this.props.actions.logout}>Logout</a></li>
          </ul>
        </div>
      </nav>
    ); }

    else  {
      return (
      <nav>
        <div className="nav-wrapper cyan darken-3">
          <ul className="left">
            <li><a href="/">Home</a></li>
          </ul>
          <a href="index.html" className="brand-logo center">Prolanner</a>
          <ul id="nav-mobile" className="right">
            <li><a href="#" onClick={this.props.actions.login}>Login via Github</a></li>
          </ul>
        </div>
      </nav>
    );
    }
  }

}
MyComponents.NavBar = NavBar