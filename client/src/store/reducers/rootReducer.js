import {combineReducers} from 'redux'
import metersReducer from './meters'
import repoReducer from './repo'

export default combineReducers({
  meters: metersReducer,
  repo: repoReducer
})
