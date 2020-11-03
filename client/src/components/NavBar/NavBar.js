import React from 'react'
import logo from './logo.svg'
import {Link, NavLink} from 'react-router-dom'

const NavBar = props => {
  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" loading="lazy"/>
        Water meters IOT
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink exact to="/" activeClassName="active" className="nav-link">Meters</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" activeClassName="active" className="nav-link">About app</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
