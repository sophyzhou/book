class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper cyan darken-3">
          <a href="index.html" className="brand-logo center">Prolanner</a>
          <ul id="nav-mobile" className="right">
            <li><a href="/apps/together/landing/">Landing</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
MyComponents.NavBar = NavBar