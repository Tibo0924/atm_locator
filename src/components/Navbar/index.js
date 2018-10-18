import React from 'react'
import './style.css'
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



	const Navigation = () => {
		return (
			<Navbar className="navbar navbar-expand-lg">
				<NavItem className="nav-item">
					<i className="fa fa-coffee" aria-hidden="true"></i>
				</NavItem>
				<NavItem className="nav-item">
					<i class="fa fa-share-square-o" aria-hidden="true"></i>	
				</NavItem>
				<NavItem className="nav-item">
					<i className="fa fa-ellipsis-h"></i>
				</NavItem>
				<NavItem>				
					<i class="fa fa-user-circle-o" aria-hidden="true"></i>
				</NavItem>

			</Navbar>
	)
}

export default Navigation;
