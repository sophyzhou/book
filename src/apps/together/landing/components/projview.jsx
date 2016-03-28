MyComponents.proj = React.createClass({
  render: function(){
    var projID = this.props.proj.projectMetaData.projectID
    var url = "/apps/together/project/#"+projID
    return (
      <div className="col s6">
        <div className="card teal lighten-1">
          <div className="card-content">
            <a href={url}><span className="card-title white-text"><h4>{this.props.proj.projectMetaData.projectName}</h4></span></a>
          </div>
        </div>
      </div>
    );
  }
});

class ProjView extends React.Component {
  render(){
    var proj = this.props.projs.map(function(u, i){
      return <MyComponents.proj proj={u} key={i} />
    })

    if (this.props.user) {
      var url = "newProj.html#"+this.props.user.userID
      return(
        <div className="row">
          <div className="col s6">
            <div className="card blue-grey lighten-4">
              <div className="card-content">
                <a href={url} target="_blank"><span className="card-title blue-grey-text"><h4>+ New Project</h4></span></a>
              </div>
            </div>
          </div>
          {proj}
        </div>
      );
    }
    else {
      return <div></div>
    }
  }
}

MyComponents.ProjView = ProjView