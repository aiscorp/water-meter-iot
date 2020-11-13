import axios from 'axios'
import {FETCH_READINGS_ERROR, FETCH_READINGS_SUCCESS} from './actionTypes'

export function fetchReadings() {
  return async dispatch => {
    try {
      const res = await axios.get(`${window.ENV.serverUrl}api/test/readings`, {})
      const readings = res.data
      dispatch(fetchReadingsSuccess(readings))
    } catch (e) {
      dispatch(fetchReadingsError(e))
    }
  }
}

export function fetchReadingsSuccess(readings) {
  return {
    type: FETCH_READINGS_SUCCESS,
    readings
  }
}

export function fetchReadingsError(e) {
  return {
    type: FETCH_READINGS_ERROR,
    error: e
  }
}
