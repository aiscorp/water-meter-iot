import {authLogin, authLogout, authUser} from '../store/actions/auth'
import {connect} from 'react-redux'
import React, {useEffect} from 'react'


const withAuth = ComposedComponent => {
  const mapStateToProps = state => ({
    user: state.auth.user
  })

  const mapDispatchToProps = {
    authUser,
    authLogout,
    authLogin
  }

  return connect(mapStateToProps, mapDispatchToProps)(
    (props) => {
      const {user, authUser} = props
      useEffect(() => {authUser()}, [authUser])

      return user && <ComposedComponent {...props}/>
    }
  )
}


export default withAuth
