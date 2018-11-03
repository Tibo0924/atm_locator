/* eslint-disable react/prop-types */

import React from 'react';
import './style.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: '',
      checked: false,
    };
    this.handleChecked = this.handleChecked.bind(this);
  }
  handleChecked(event) {
    console.log(event.target.checked);
    this.setState({
      checked: !this.state.checked,
    });
    this.props.fetchData(this.state);
  }
  render() {
    return (
      <div className="Searchfields" >
        <div className="top_navbar">
          <div className="signup">Sign up</div>
          <div className="signin">Sign in</div>
        </div>
        <div className="parameters">
          <div>
            Lorem ipsum dolorem
          </div>
          <form>
            <label className="zipCodeLabel">Search by Zip code</label>
            <input type="text" />
            <label>
              Switch for bank or atm location
              <input
                type="checkbox"
                checked={this.state.checked}
                onClick={e => this.setState({ checked: !e.target.checked })}
              />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
