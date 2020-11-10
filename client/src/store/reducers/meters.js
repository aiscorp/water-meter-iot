import {FETCH_METERS_ERROR, FETCH_METERS_START, FETCH_METERS_SUCCESS} from '../actions/actionTypes'

const initialState = {
  loading: true,
  error: null,
  meters: []
}

export default function metersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_METERS_START:
      return {
        ...state, loading: true
      }
    case FETCH_METERS_SUCCESS:
      return {
        ...state, loading: false, meters: action.meters
      }
    case FETCH_METERS_ERROR:
      return {
        ...state, loading: false, error: action.error
      }


    default:
      return state
  }
}
