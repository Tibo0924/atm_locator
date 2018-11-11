
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
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
      closestBranch: [],
      checked: true,
    };
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition = () => {
    console.log('getting current pos');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const ownLatitude = position.coords.latitude;
        const ownLongitude = position.coords.longitude;
        console.log(ownLatitude, ownLongitude);
        this.callAPI(ownLatitude, ownLongitude);
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
    const endPointEnd = this.state.checked ? 'branches' : 'atms';
    fetch(`https://atlas.api.barclays/open-banking/v2.1/${endPointEnd}`)
      .then(data => data.json())
      .then(data => this.handleResponse(data, lat, lng));
    console.log('this is the state after API call -callAPI Function-', this.state);
  }

  updateState = (newState) => {
    this.setState({
      update: newState,
    });
  }

  handleResponse = (data, ownLatitude, ownLongitude) => {
    console.log('handleResponse', data);
    if (this.state.checked && data) {
      const Branches = data.data[0].Brand[0].Branch;
      const closestBranch = Branches.map((datas, i) => {
        const a = Math.abs(ownLatitude - datas.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const b = Math.abs(ownLongitude - datas.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return Object.assign({}, { distance: c, datas, id: v4(), display: true });
      }).sort((a, b) => a.distance - b.distance).slice(0, 10);
      this.setState({
        closestBranch,
      });
    } else if (data) {
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
        <div className="kek">
          <Search
            apiCall={this.callAPI}
            fetchData={this.updateState}
          />
          <div className="resultList">
            {this.state.closestATM.length || this.state.closestBranch.length ?
              <List
                closestATM={this.state.closestATM}
                closestBranches={this.state.closestBranch}
                showDetails={this.showDetails}
                checked={this.state.checked}
              />
              : 'sorry no data'
            }
          </div>
          <Navigation />
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
