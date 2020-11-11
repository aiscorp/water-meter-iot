import React from 'react'
import ReactDOM from 'react-dom'
import './config/config'
import './index.css'
import App from './App'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'
import graphqlClient from './graphql/graphqlClient'
import {ApolloProvider} from '@apollo/react-hooks'

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
    <ApolloProvider client={graphqlClient}>
      <Router basename={window.ENV.baseUrl}>
        <App/>
      </Router>
    </ApolloProvider>
  </Provider>

)

ReactDOM.render(app, document.getElementById('root'))

