const {Map, Marker, CircleMarker, Popup, TileLayer, MapLayer}  = window.ReactLeaflet

class MapView extends React.Component {
   render(){
    return <div>
      <div>

			  <Map center={[37.78, -122.41]} zoom={12}>
				<TileLayer
				  attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
				   url='https://api.tiles.mapbox.com/v4/doubleshow.noeko77m/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG91Ymxlc2hvdyIsImEiOiJjaWZ5Y3B1eTE1MHRidWRtMG9uZXluajg4In0.u5ONW27Ly5cU7M5KYi6Y9Q' 
				/>
      
				
				<Marker position={[37.7876789151, -122.407447946]}>
				  <Popup>
					<span>Marker 1 <br/> Rest 1</span>
				  </Popup>
				</Marker>
				<Marker position={[37.77810302, -122.4225312]}>
				  <Popup>
					<span>Marker 2 <br/> Rest 2</span>
				  </Popup>
				</Marker>				
			  </Map>
      </div>
    </div>
  }
  // render(){

    // const providers = this.props.providers
    // const providerElements = _.map(providers, function(p,i){
      
    //   var pos = [p.lat, p.lon];
    //   return <Marker position={pos} key={i}>
    //     <Popup>
    //       <span>{JSON.stringify(p)}</span>
    //     </Popup>
    //   </Marker>
    // })

    // let userElement
    // if (this.props.user){
    //   userElement = <CircleMarker center={this.props.user.pos}/>
    // } else {
    //   userElement = ''
    // }

    // Note: .bind(this) is important for the handler function's 'this'
    // pointer to refer to this MapView instance

  //   return  
      
  //     <Map center={[37.78, -122.41]} zoom={20}>
  //       //   zoom={13}
  //       //   onLeafletClick={this.handleLeafletClick.bind(this)}>
  //       // <TileLayer
  //       //   url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  //       //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //       // />
		// <TileLayer
		// 	attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
		// 	url='https://api.tilesiview.mapbox.com/v4/doubleshow.noeko77m/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG91Ymxlc2hvdyIsImEiOiJjaWZ5Y3B1eTE1MHRidWRtMG9uZXluajg4In0.u5ONW27Ly5cU7M5KYi6Y9Q' 
		// />

		// <Marker position={[37.7876789151, -122.407447946]}>
		//   <Popup>
		// 	<span>A pretty CSS3 popup. <br/> Easily customizable.</span>
		//   </Popup>
		// </Marker>

  //       // {providerElements}
  //       // {userElement}

  //     </Map>
  


  handleLeafletClick(event){
    console.log('leaflet click event', event)
    this.props.setUserLocationAction(event.latlng)
  }
}

MyComponents.MapView = MapView
window.ReactDOM.render(<MapView />, document.getElementById('app-container'));






