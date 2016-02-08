MyComponents.Education = React.createClass({

  render: function() {
    return (
      <li className="collection-item"> <i className="tiny material-icons">label</i>&nbsp; {this.props.education.degree} in {this.props.education.major} at {this.props.education.school}, {this.props.education.period} </li>
    );
  }
});


MyComponents.EducationList = React.createClass({
  render: function() {

    var educations = this.props.educations.map(function(s,i){
      return <MyComponents.Education education={s} key={i}/>
    });
    
    return (
      <div className="card black lighten-1">
        <div className="row">
      
          <div className="col s12">
            <div className="card black darken-2">
              <div className="card-content white-text">
                <ul className="collection black-text">
                {educations}
                </ul>
              </div>
            </div>
          </div>
      
      
        </div>
      </div>
    );
  }
});