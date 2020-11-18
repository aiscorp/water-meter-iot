import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import {authLogin, authLogout, authUser} from '../../store/actions/auth'
import {connect} from 'react-redux'

const Auth = (props) => {
  const {user, authUser, authLogin, authLogout} = props

  useEffect(() => {authUser()}, [authUser])

  if (user.authState) {
    return (
      <div className="m-0 p-3 m-md-5 p-md-5 bg-white shadow-lg">
        <h2>Hello {user.displayName}!</h2>
        <p>You are logged in to the app, if you want to log out, click the button below:</p>
        <Button onClick={authLogout} size="lg" block>
          <FontAwesomeIcon className="mx-2 my-auto" size="1x" icon={faSignOutAlt}/>
          Log Out by Google
        </Button>
      </div>
    )
  } else {
    return (
      <div className="m-0 p-3 m-md-5 p-md-5 bg-white shadow-lg">
        <h2>Please sign in with your Google Account</h2>
        <p>This app does not receive, use, or store your confidential data.</p>
        <Button onClick={authLogin} size="lg" block>
          <FontAwesomeIcon className="mx-2 my-auto" size="1x" icon={faGoogle}/>
          Sign in with Google
        </Button>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  authLogin,
  authLogout,
  authUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

