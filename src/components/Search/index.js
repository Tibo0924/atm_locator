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
    console.log(' send state to main.');
    this.props.apiCall();
    // console.log(this.props.apiCall());
  }
  render() {
    const isBank = this.state.checked ? 'Bank' : 'ATM';
    return (
      <div className="Searchfields" >
        <div className="top_navbar">
          <div className="signup">Sign up</div>
          <div className="signin">Sign in</div>
        </div>
        <div className="parameters">
          <h2><span>{isBank}</span> locator</h2>
          <form>
            <label htmlFor="normal-switch">
              <span>Choose {isBank}</span>
              <Switch
                onChange={this.handleChange}
                checked={this.state.checked}
                id="normal-switch"
              />
            </label>
            <select name="branches" id="branches" onChange={e => this.setState({ branch: e.target.value })}>
              <option disabled hidden />
              <option value="tsb">TSB</option>
              <option value="barclays">Barclays</option>
              <option value="natwest">Natwest</option>
              <option value="ulsterbank">ulsterbank</option>
              <option value="halifax">Halifax</option>
              <option value="royalbankofscotland">Royal bank of Scotland</option>
              <option value="bankofirelanduk">Bank of Ireland (UK)</option>
              <option value="santanders">Santanders</option>
              <option value="lloyds">Lloyds</option>
            </select>
            <button className="btn" onClick={this.sendState} >Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
