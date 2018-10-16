import React from 'react';
import './style.css'

const Search = () => {
	return (
		<div className="Searchfields">
			<h2>Cash point locator</h2>
			<div className="divider">
				<form action="signup" submit='' className="form">
					<label>All banks &nbsp;</label>
					<input type="checkbox"/>
					<label>Select a bank</label>
					<select>
						<option value="" selected disabled hidden>Select a bank</option>
						<option value="">TSB</option>
						<option value="">Barclays</option>
						<option value="">Santanders</option>
						<option value="">HSBC</option>
					</select>
				</form>
			</div>
	</div>
	)	
}

export default Search