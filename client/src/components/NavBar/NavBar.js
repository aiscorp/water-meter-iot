import React from 'react'
import logo from './logo.svg'
import {Link, NavLink} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import AuthNavItem from '../AuthNavItem/AuthNavItem'

const NavBar = props => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          <img src={logo} width="30" height="30"
               className="d-inline-block align-top mr-2"
               alt="" loading="lazy"/>
          Water meters IOT
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
            <NavLink exact to="/meters" activeClassName="active" className="nav-link">Meters</NavLink>
            <NavLink exact to="/readings" activeClassName="active" className="nav-link">Readings</NavLink>
            <NavLink to="/about" activeClassName="active" className="nav-link">About app</NavLink>

            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <AuthNavItem/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
