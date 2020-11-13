import {combineReducers} from 'redux'
import metersReducer from './meters'
import readingsReducer from './readings'
import repoReducer from './repo'

export default combineReducers({
  meters: metersReducer,
  readings: readingsReducer,
  repo: repoReducer
})
