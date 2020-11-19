import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import WithAuth from './WithAuth'

const PrivateRoute = (props) => {
  const {user, children, ...rest} = props

  return (
    <Route
      {...rest}
      render={
        ({location}) =>
          user.authState ?
            (children)
            :
            (<Redirect to={{pathname: '/profile', state: {from: location}}}/>)
      }
    />
  )
}

export default WithAuth(PrivateRoute)

