import React, { Component } from 'react';
import './App.css';
import Body from './components/body'
import Location from './components/location'

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:[],
		}
	}
	
  render() {
    return (
      <div className="App">
				<Body />
				<Location />
      </div>
    );
  }
}

export default App;
