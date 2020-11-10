import React from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import AboutPage from './pages/AboutPage'
import MetersPage from './pages/MetersPage'
import {TableDataProvider} from './components/TableDataProvider/TableDataProvider'


function App() {

  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path='/table/:size' component={TableDataProvider}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/" component={MetersPage}/>
      </Switch>
    </>
  )
}

export default App
