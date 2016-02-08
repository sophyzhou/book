MyComponents.Skill = React.createClass({

  render: function() {
    return (
      <li className="collection-item">{this.props.skill}</li>
    );
  }
});

MyComponents.SkillList = React.createClass({
  render: function() {

    var languages = this.props.skills.Languages.map(function(s,i){
      return <MyComponents.Skill skill={s} key={i}/>
    });
    var frameworks = this.props.skills.Framework.map(function(s,i){
      return <MyComponents.Skill skill={s} key={i}/>
    });
  
    return (
      <div className="card black lighten-1">
        <div className="row">
      
          <div className="col s6">
            <div className="card black darken-2">
              <div className="card-content white-text">
                <span className="card-title"> <i className="small material-icons">language</i>&nbsp;<b>Languages</b></span>
                <ul className="collection black-text">
                {languages}
                </ul>
              </div>
            </div>
          </div>
      
          <div className="col s6">
            <div className="card black darken-2">
              <div className="card-content white-text">
                <span className="card-title"> <i className="small material-icons">book</i>&nbsp;<b>Frameworks</b></span>
                <ul className="collection black-text">
                {frameworks}
                </ul>
              </div>
            </div>
          </div>
      
        </div>
      </div>
    );
  }
});