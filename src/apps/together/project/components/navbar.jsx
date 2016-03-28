class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper cyan darken-3">
          <a href="/apps/together/" className="brand-logo center" id="logo">Prolanner</a>
          <ul id="nav-mobile" className="right">
            <li><a href="/apps/together/landing/">LANDING</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
MyComponents.NavBar = NavBar
