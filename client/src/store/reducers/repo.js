import {FETCH_REPO_ERROR, FETCH_REPO_START, FETCH_REPO_SUCCESS} from '../actions/actionTypes'

const initialState = {
  loading: true,
  error: null,
  repoInfo: {}
}


export default function repoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REPO_START:
      return {
        ...state, loading: true
      }
    case FETCH_REPO_SUCCESS:
      return {
        ...state, loading: false, repoInfo: action.repoInfo
      }
    case FETCH_REPO_ERROR:
      return {
        ...state, loading: false, error: action.error
      }


    default:
      return state
  }
}
