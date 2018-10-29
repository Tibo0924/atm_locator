import React, { Component } from 'react';
import { v4 } from 'uuid';
import Search from './components/Search';
import List from './components/List';
import Navigation from './components/Navbar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closestATM: [],
    };
  }

  componentDidMount() {
    this.getCurrentPosition();
  }
  getCurrentPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const ownLatitude = position.coords.latitude;
        const ownLongitude = position.coords.longitude;
        // console.log('ownLatide:',ownLatitude,'ownLongitude:',ownLongitude,)

        fetch('https://atlas.api.barclays/open-banking/v2.1/atms')
          .then(data => data.json())
          .then(data => this.handleResponse(data, ownLatitude, ownLongitude));
      });
    } else {
      console.log('sorry something went wrong Tibi');
    }
  }
  customFetch = (bankName, find) => {
    const api = `https://atlas.api.${bankName}/open-banking/v2.1/${find}`
    fetch(api)
      .then(data => data.json())
      .then(data => this.handleResponse(data, ownLatitude, ownLongitude))
  }

  handleResponse = (data, ownLatitude, ownLongitude) => {
    console.log(data);
    if (data) {
      const ATM = data.data[0].Brand[0].ATM;
      const closestATM = ATM.map((cashpoint) => {
        const a = Math.abs(ownLatitude - cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const b = Math.abs(ownLongitude - cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return Object.assign({}, closestATM, { distance: c, cashpoint, id: v4(), display: true });
      }).sort((a, b) => a.distance - b.distance).slice(0, 10);

      this.setState({
        closestATM,
      });
    }
  }

  showDetails = (id) => {
    const newState = this.state.closestATM.map((atm) => {
      if (atm.id === id) {
        return { ...atm, display: !atm.display };
      }
      return atm;
    });
    this.setState({ closestATM: newState });
  }

  render() {
    return (
      <div className="App">
        <div className="componentWrapper">
          <Search />
          <div className="resultList">
            {this.state.closestATM.length &&
              <List
                closestATM={this.state.closestATM}
                showDetails={this.showDetails}
                isHidden={this.state.shown}
              />
            }
          </div>
          <Navigation />
        </div>
      </div>

    );
  }
}

export default App;
