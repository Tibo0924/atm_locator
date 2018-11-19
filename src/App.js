
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { v4 } from 'uuid';
import List from './components/List';
import Navigation from './components/Navbar';
import Landing from './components/Landing_page/';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closestATM: [],
      closestBranch: [],
      checked: true,
    };
  }

  componentDidMount() {
    this.fetchForAtm();
    this.fetchForBranches();
  }

  getCurrentPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const ownLatitude = position.coords.latitude;
        const ownLongitude = position.coords.longitude;
        console.log('Latitude', ownLatitude, 'Longitude', ownLongitude);
        this.fetchForAtm(ownLatitude, ownLongitude);
        this.fetchForBranches(ownLatitude, ownLongitude);
      });
    } else {
      console.log('Geolocation not avail');
    }
  }
  fetchForAtm = (lat, lng) => {
    fetch('https://atlas.api.barclays/open-banking/v2.2/atms')
      .then(data => data.json())
      .then(data => this.handleResponse(data, lat, lng));
  }
  fetchForBranches = (lat, lng) => {
    fetch('https://atlas.api.barclays/open-banking/v2.2/branches')
      .then(data => data.json())
      .then(data => this.handleResponse(data, lat, lng));
  }

  handleResponse = (data, ownLatitude, ownLongitude) => {
    console.log(data);
    const Branches = data.data[0].Brand[0].Branch;
    if (Branches) {
      const closestBranch = Branches.map((datas, i) => {
        const a = Math.abs(ownLatitude - datas.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const b = Math.abs(ownLongitude - datas.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return Object.assign({}, { distance: c, datas, id: v4(), display: true });
      }).sort((a, b) => a.distance - b.distance).slice(0, 10);
      this.setState({
        closestBranch,
      });
    } else {
      const ATM = data.data[0].Brand[0].ATM;
      const closestATM = ATM.map((datas) => {
        const a = Math.abs(ownLatitude - datas.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const b = Math.abs(ownLongitude - datas.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return Object.assign({}, { distance: c, datas, id: v4(), display: true });
      }).sort((a, b) => a.distance - b.distance).slice(0, 10);
      this.setState({
        closestATM,
      });
    }
  }

  showDetails = (id) => {
    if (!this.state.checked) {
      const newState = this.state.closestATM.map((atm) => {
        if (atm.id === id) {
          return { ...atm, display: !atm.display };
        }
        return atm;
      });
      this.setState({ closestATM: newState });
    } else {
      const newState = this.state.closestBranch.map((branch) => {
        if (branch.id === id) {
          return { ...branch, display: !branch.display };
        }
        return branch;
      });
      this.setState({ closestBranch: newState });
    }
  }

  render() {
    const myApp = () =>
      (
        <div>
          <Navigation />
          <div className="top-bar">
            <h2>Hello</h2>
            <button>This</button>
            <p>lorem ipsum dolorem bla bla bla </p>
          </div>
          <div className="resultList">
            <List
              closestATM={this.state.closestATM}
              closestBranches={this.state.closestBranch}
              showDetails={this.showDetails}
              checked={this.state.checked}
            />
          </div>
        </div>
      );
    return (
      <Router>
        <Switch>
          <div className="App">
            <div className="componentWrapper">
              <Route path="/" exact component={Landing} />
              <Route path="/app" component={myApp} />
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}
export default App;
