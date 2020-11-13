import {FETCH_READINGS_ERROR, FETCH_READINGS_SUCCESS} from '../actions/actionTypes'

const initialState = {
  loaded: false,
  error: null,
  readings: []
}

export default function readingsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_READINGS_SUCCESS:
      return {
        ...state, loaded: true, readings: action.readings
      }
    case FETCH_READINGS_ERROR:
      return {
        ...state, error: action.error
      }
    default:
      return state
  }
}
