import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {authUser} from '../../store/actions/auth'
import {connect} from 'react-redux'

const AuthNavItem = (props) => {
  const {user, authUser} = props

  useEffect(() => {authUser()}, [authUser])

  if (user.authState) {
    return (
      <Link to="/" className="navbar-brand">
        <img src={user.photo} width="30" height="30"
             className="d-inline-block align-top rounded-circle mr-2"
             alt="" loading="lazy"/>
        {user.displayName}
      </Link>
    )
  } else {
    return <>
      <Link to="/" className="navbar-brand">
        <FontAwesomeIcon className="mx-2 my-auto" size="1x" icon={faSignInAlt}/>
        Sing in...
      </Link>
    </>
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  authUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthNavItem)

