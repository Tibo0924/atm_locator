
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { v4 } from 'uuid';
import Search from './components/Search';
import List from './components/List';
import Navigation from './components/Navbar';
import Landing from './components/Landing_page/';
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
    console.log('getting current pos');
    if ('geolocation' in navigator) {
      console.log(navigator);
      navigator.geolocation.getCurrentPosition((position) => {
        const ownLatitude = position.coords.latitude;
        const ownLongitude = position.coords.longitude;
        console.log(ownLatitude, ownLongitude);
        this.callAPI(ownLatitude, ownLongitude);
        // const criteria = this.state.update.checked ? 'branches' : 'atms';
        // const APIcollection = {
        //   Nationalwest: 'https://openapi.natwest.com/open-banking/v2.2/branches',
        //   Santander: 'openbanking.santander.co.uk/sanuk/external/open-banking/v2.2/branches',
        //   Lloyds: 'https://api.lloydsbank.com/open-banking/v2.2/branches',
        //   Barclays: 'https://atlas.api.barclays/open-banking/v2.2/branches',
        //   BankofIrelanduk: 'https://openapi.bankofireland.com/open-banking/v2.2/branches',
        //   Bankofscotland: 'https://api.bankofscotland.co.uk/open-banking/v2.2/branches',
        //   RoyalbankofScotland: 'https://openapi.rbs.co.uk/open-banking/v2.2/branches',
        //   Halifax: 'https://api.halifax.co.uk/open-banking/v2.2/branches',
        //   UlstersBank: 'https://openapi.ulsterbank.co.uk/open-banking/v2.2/branches',
        // };
        // const bankName = Object.values(APIcollection).filter(bank => bank === this.state.update.branch);
        // console.log(bankName);
      });
    } else {
      console.log('Geolocation not avail');
    }
  }

  callAPI = (lat, lng) => {
    console.log(lat, lng);
    fetch('https://atlas.api.barclays/open-banking/v2.2/atms')
      .then(data => data.json())
      .then(data => this.handleResponse(data, lat, lng));
  }

  updateState = (newState) => {
    this.setState({
      update: newState,
    });
  }
  handleResponse = (data, ownLatitude, ownLongitude) => {
    console.log(data);
    const ATM = data.data[0].Brand[0].ATM;
    // const Branch = data.data[0].Brand[0].Branch;
    if (ATM) {
      // const closestBranch = Branch.map((branch) => {
      //   const a = Math.abs(ownLatitude - branch.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
      //   const b = Math.abs(ownLongitude - branch.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
      //   const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      //   return Object.assign({}, closestBranch, { distance: c, branch, id: v4(), display: true });
      // }).sort((a, b) => a.distance - b.distance).slice(0, 10);
      const closestATM = ATM.map((cashpoint) => {
        const a = Math.abs(ownLatitude - cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const b = Math.abs(ownLongitude - cashpoint.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return Object.assign({}, closestATM, { distance: c, cashpoint, id: v4(), display: true });
      }).sort((a, b) => a.distance - b.distance).slice(0, 10);

      this.setState({
        closestATM,
        // closestBranch,
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
    const myApp = () =>
      (
        <div className="kek">
          <Search
            handleSelected={this.handleSelected}
            fetchData={this.updateState}
          />
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
      );

    return (
      <Router>
        <div className="App">
          <div className="componentWrapper">
            <Route path="/landing" component={Landing} />
            <Route path="/app" component={myApp} />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
