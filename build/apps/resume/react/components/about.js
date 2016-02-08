MyComponents.About = React.createClass({

  render: function() {
    var name = this.props.name;
    var email = this.props.email;
    var current = this.props.current;
    var description = this.props.description;
    var github = this.props.github

    var picture = "profile.jpg"
    
    return (

      <div className="card black lighten-1">
      <div className="row">
        <div className="col s4">
          <div className="card black darken-1">
            <div className="card-image">
              <img src="profile.jpg"/>
            </div>
          </div>
        </div>
      
        <div className="col s8">
          <div className="card black lighten-1">
            <div className="card-content white-text">
              <span className="card-title">About Me</span>
                <p><i className="tiny material-icons">person</i>&nbsp; <b>Yun Zhou:</b> {current}</p>
                <p><i className="tiny material-icons">email</i>&nbsp; <a href="mailto:yun.zhou-1@colorado.edu"> {email}</a></p>              
                <p><i className="tiny material-icons">group</i>&nbsp; <a href={github}>{github}</a></p>
                <p><i className="tiny material-icons">phone</i>&nbsp; 123456789</p>

            </div>
          </div>
        </div>
      
      </div>
      
      </div>
    );
  }

});
