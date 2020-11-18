import axios from 'axios'
import {
  FETCH_LOGIN_START,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
  FETCH_LOGOUT
} from './actionTypes'

export function authLogin() {
  return async dispatch => {
    dispatch(authLoginStart())
    try {
      axios.get(`${window.ENV.serverUrl}api/user`, {withCredentials: true})
        .then(res => {
          dispatch(authLoginSuccess(res.data))

        })
        .catch(e => {
          dispatch(authLoginError(e))
          if(e.response.status === 401){
            window.location.href = `${window.ENV.serverUrl}auth/google`
          }
        })

    } catch (e) {
      dispatch(authLoginError(e))
    }
  }
}

export function authUser() {
  return async dispatch => {
    dispatch(authLoginStart())
    try {
      axios.get(`${window.ENV.serverUrl}api/user`, {withCredentials: true})
        .then(res => {
          dispatch(authLoginSuccess(res.data))

        })
        .catch(e => {
          dispatch(authLoginError(e))
        })

    } catch (e) {
      dispatch(authLoginError(e))
    }
  }
}

export function authLogout() {
  return async dispatch => {
    dispatch(authLogoutStart())
    try {
      window.location.href = `${window.ENV.serverUrl}auth/logout`
    } catch (e) {
    }
  }
}

export function authLoginStart() {
  return {
    type: FETCH_LOGIN_START
  }
}

export function authLoginSuccess(user) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    user
  }
}

export function authLoginError(e) {
  return {
    type: FETCH_LOGIN_ERROR,
    error: e
  }
}

export function authLogoutStart() {
  return {
    type: FETCH_LOGOUT
  }
}
