import React from 'react'
import ReactDOM from 'react-dom'
import './config/config'
import './index.css'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const app = (
  <Provider store={store}>
    <Router basename={window.ENV.baseUrl}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Router>
  </Provider>

)

ReactDOM.render(app, document.getElementById('root'))

