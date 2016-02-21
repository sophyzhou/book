class NavBar extends React.Component {

  render(){
    return (
      <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo center">Hungry Asian</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="index.html">Home</a></li>
          <li><a href="client.html">Client</a></li> 
          <li><a href="admin.html">Admin</a></li>           
        </ul>
        </div>
      </nav>
    );
  }

}
MyComponents.NavBar = NavBar
