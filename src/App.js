import React, { Component } from 'react';
import Search from './components/Search'
import List from './components/List'
import Navigation from './components/Navbar'
import './App.css';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			data: [],
		}
	}

	componentDidMount() {
		this.getCurrentPosition()
	}
	getCurrentPosition = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const ownLatitude = position.coords.latitude
				const ownLongitude = position.coords.longitude
				console.log('ownLatide:',ownLatitude,'ownLongitude:',ownLongitude,)

				fetch('https://trintproxy-bowwhozuws.now.sh/api')
				.then(data => data.json())
				.then(data => this.handleResponse(data,ownLatitude,ownLongitude))
			})
		} else {
			console.log('sorry something went wrong Tibi')
		}
	}

	handleResponse = (data,ownLatitude,ownLongitude) => {
		if(data){
			const ATM = data.data[0].Brand[0].ATM
			const closestATM = ATM.map(cashpoint => {
				const a =  Math.abs(ownLatitude - cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude)
				const b = Math.abs(ownLongitude - cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude)
				const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
				return Object.assign({}, closestATM, {distance: c, cashpoint: cashpoint})
				
			}).sort((a,b) => a.distance - b.distance).slice(0, 10)
			this.setState({
				closestATM: closestATM,
			})
			return closestATM
		}
	}


	
  render() {
  	return (
      <div className="App">
				<div className="componentWrapper">
					<Search />
					<div className="resultList">
					{this.state.closestATM && <List closestATM={this.state.closestATM}/>}
					</div>
					<Navigation />
				</div>
      </div>

    );
  }
}

export default App;
