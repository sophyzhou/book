const { Map, TileLayer, Marker, Popup } = window.ReactLeaflet;
class ProviderMap extends React.Component {
  render(){
    return <div>
      <div>ToDo: ToDo: Show All Providers on a Map
        <pre>

			  <Map center={[37.78, -122.41]} zoom={13}>
				<TileLayer
				  attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
				   url='https://api.tiles.mapbox.com/v4/doubleshow.noeko77m/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZG91Ymxlc2hvdyIsImEiOiJjaWZ5Y3B1eTE1MHRidWRtMG9uZXluajg4In0.u5ONW27Ly5cU7M5KYi6Y9Q' 
				/>
				<Marker position={[37.7876789151, -122.407447946]}>
				  <Popup>
					<span>A pretty CSS3 popup. <br/> Easily customizable.</span>
				  </Popup>
				</Marker>
				<Marker position={[37.77810302, -122.4225312]}>
				  <Popup>
					<span>A pretty CSS3 popup. <br/> Easily customizable.</span>
				  </Popup>
				</Marker>				
			  </Map>
		</pre>
      </div>
    </div>
  }
}

MyComponents.ProviderMap = ProviderMap
window.ReactDOM.render(<ProviderMap />, document.getElementById('app-container'));