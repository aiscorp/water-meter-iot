import {combineReducers} from 'redux'
import metersReducer from './meters'

export default combineReducers({
  meters: metersReducer

})
