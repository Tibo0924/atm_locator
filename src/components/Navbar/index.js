import React from 'react'

import {
	Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
	Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
	DropdownItem } from 'reactstrap';
	import { BrowserRouter as Router } from 'react-router-dom';
	import 'font-awesome/css/font-awesome.min.css'
	import './style.css'



	const Navigation = () => {
		return (
			<Navbar className="navbar navbar-expand-lg">
				<div className="nav-item">
					<a href="buymeacoff.ee/dN0zCMVqU">
						<i className="fa fa-coffee" aria-hidden="true"></i>
					</a>
					<label htmlFor="icons">Buy me a coffee</label>							
				</div>
				<div className="nav-item">
					<i className="fa fa-share-square-o" aria-hidden="true"></i>	
					<label htmlFor="icons">Share </label>													
				</div>
				<div className="nav-item">
					<a>
						<i className="fa fa-ellipsis-h"></i>
					</a>
					<label htmlFor="icons">Other</label>							
				</div>
				<div className="nav-item">				
					<a href="https://tiborkeri.com" target="_blank">
						<i className="fa fa-user-circle-o" aria-hidden="true"></i>
					</a>
					<label htmlFor="icons">About me</label>														
				</div>
			</Navbar>
	)
}

export default Navigation;
