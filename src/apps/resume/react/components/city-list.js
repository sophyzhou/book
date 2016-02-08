MyComponents.City = React.createClass({

  render: function() {
    
    var city = this.props.city
    var name = this.props.name
    var picture = "profile.jpg"
    var city_pic = "img/"+name+".jpg"
    var weather_icon = "img/" + this.props.city.currently.icon + ".png"


    return (
      <div className="card black lighten-1">
      <div className="row">

      <div className="col s12">
        <div className="card black lighten-4">
          <div className="card-content white-text">
            <img src= {weather_icon} alt="" className="circle" height="50" width = "50"/>
            <span className="card-title"><b>{name.toUpperCase()}</b></span>

              <ul className="collection black-text">
                  <a href="#!" className="secondary-content"><img src= {city_pic} height="165" width = "300"/></a>
                  <li className="collection-item">{this.props.city.currently.summary}</li>
                  <li className="collection-item">Temperature: {this.props.city.currently.temperature} F</li>
                  <li className="collection-item">Precipitation Chance: {(this.props.city.currently.precipProbability * 100)}%</li>
                  <li className="collection-item">Visability: {this.props.city.currently.visibility}</li>

              </ul>
            </div>
          </div>
        </div>

        </div>
        </div>
    );
  }

});

MyComponents.CityList = React.createClass({
  render: function() {

    var citieselement = [];
    
    for( var key in this.props.cities){
      if (this.props.cities.hasOwnProperty(key)) {
        var city_t = this.props.cities[key];
        var tmp = <MyComponents.City city={city_t} name={key} key={key}/>
        citieselement.push(tmp);

      }
    }

    return (

      <div className="card black lighten-2">
        <div className="card-content white-text">
          <div className="row">
          {citieselement}
          </div>
        </div>
      </div>
    );
  }
});