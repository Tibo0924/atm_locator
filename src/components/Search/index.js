/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Switch from 'react-switch';
import './style.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: '',
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }
  sendState = () => {
    this.props.fetchData(this.state);
    console.log('this is being send to main component', this.state);
    this.props.apiCall();
  }
  render() {
    const isBank = this.state.checked ? 'Bank' : 'ATM';
    return (
      <div className="Searchfields" >
        <div className="top_navbar">
          <div className="signup">Sign up</div>
          <div className="signin">Sign in &nbsp;<i className="fa fa-sign-in" aria-hidden="true" /></div>
        </div>
        <div className="parameters">
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            id="normal-switch"
          />
          <h2><span>{isBank}</span> locator</h2>
          <form className="form">
            <label htmlFor="normal-switch" />
            <br />
            <button className="btn" onClick={this.sendState} >Search</button>
            <select name="branches" id="branches" onChange={e => this.setState({ branch: e.target.value })}>
              <option disabled hidden />
              <option value="Barclays">Barclays</option>
              <option value="Nationalwest">Natwest</option>
              <option value="UlstersBank">ulsterbank</option>
              <option value="Halifax">Halifax</option>
              <option value="RoyalbankofScotland">Royal bank of Scotland</option>
              <option value="BankofIrelanduk">Bank of Ireland (UK)</option>
              <option value="Santander">Santanders</option>
              <option value="Lloyds">Lloyds</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
