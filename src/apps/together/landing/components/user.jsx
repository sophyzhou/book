class User extends React.Component {

  render(){

    if (this.props.user){
      // user is authenticated
      return <div>
        <h4 className="center-align">Welcome, {this.props.user.displayName}!</h4>
      </div>
    } else {
      // user is not set
      return <div>
        <h4 className="center-align">You are not logged in yet.</h4>
      </div>
    }
  }

}
MyComponents.User = User
