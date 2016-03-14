MyComponents.proj = React.createClass({
  render: function(){

    var projID = this.props.proj.projectMetaData.projectID
    var url = "/apps/together/project/#"+projID
    console.log("url: "+url)
    return(
      <div className="col s6">
        <div className="card cyan darken-1">
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
      return(
        <div className="row">
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
