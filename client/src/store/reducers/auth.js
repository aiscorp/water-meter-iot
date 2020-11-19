import {FETCH_LOGIN_START, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR, FETCH_LOGOUT} from '../actions/actionTypes'

const initialState = {
  user: {
    authState: false
  },
  signing: false,
  error: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGIN_START:
      return {
        ...state, signing: true
      }
    case FETCH_LOGIN_SUCCESS:
      return {
        signing: false, user: action.user, error: null
      }
    case FETCH_LOGIN_ERROR:
      return {
        signing: false, user: {authState: false}, error: action.error
      }
    case FETCH_LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}
