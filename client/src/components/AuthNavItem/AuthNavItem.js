import React from 'react'
import {Link} from 'react-router-dom'
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import WithAuth from '../../hoc/WithAuth'

const AuthNavItem = (props) => {
  const {user} = props

  if (user.authState) {
    return (
      <Link to="/profile" className="navbar-brand">
        <img src={user.photo} width="30" height="30"
             className="d-inline-block align-top rounded-circle mr-2"
             alt="" loading="lazy"/>
        {user.displayName}
      </Link>
    )
  } else {
    return <>
      <Link to="/profile" className="navbar-brand">
        <FontAwesomeIcon className="mx-2 my-auto" size="1x" icon={faSignInAlt}/>
        Sing in...
      </Link>
    </>
  }
}

export default WithAuth(AuthNavItem)
