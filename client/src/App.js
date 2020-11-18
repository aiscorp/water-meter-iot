import React from 'react'
import {
  Switch, Route
} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import AboutPage from './pages/AboutPage'
import MetersPage from './pages/MetersPage'
import {TableDataProvider} from './components/TableDataProvider/TableDataProvider'
import ReadingsPage from './pages/ReadingsPage'
import HomePage from './pages/HomePage'


function App() {

  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path='/table/:size' component={TableDataProvider}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/readings" component={ReadingsPage}/>
        <Route path="/meters" component={MetersPage}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    </>
  )
}

export default App
