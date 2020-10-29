import axios from 'axios'
import {FETCH_METERS_ERROR, FETCH_METERS_START, FETCH_METERS_SUCCESS} from './actionTypes'

export function fetchMeters() {
  return async dispatch => {
    dispatch(fetchMetersStart())
    try {
      const res = await axios.get(`${window.ENV.serverUrl}api/test/meters`, {})
      const meters = res.data
      dispatch(fetchMetersSuccess(meters))
    } catch (e) {
      dispatch(fetchMetersError(e))
    }
  }
}

export function fetchMetersStart() {
  return {
    type: FETCH_METERS_START
  }
}

export function fetchMetersSuccess(meters) {
  return {
    type: FETCH_METERS_SUCCESS,
    meters
  }
}

export function fetchMetersError(e) {
  return {
    type: FETCH_METERS_ERROR,
    error: e
  }
}
