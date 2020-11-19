import React from 'react'
import {
  Switch, Route
} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import AboutPage from './pages/AboutPage'
import MetersPage from './pages/MetersPage'
// import {TableDataProvider} from './components/TableDataProvider/TableDataProvider'
import ReadingsPage from './pages/ReadingsPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './hoc/PrivateRoute'

function App(props) {
  console.log('App.user', props.user)
  return (
    <>
      <NavBar/>
      <Switch>
        {/*<Route exact path='/table/:size' component={TableDataProvider}/>*/}
        <PrivateRoute path="/meters">
          <MetersPage/>
        </PrivateRoute>
        <PrivateRoute path="/readings">
          <ReadingsPage/>
        </PrivateRoute>

        <Route path="/profile" component={ProfilePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    </>
  )
}

export default App
