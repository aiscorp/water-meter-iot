import {FETCH_REPO_ERROR, FETCH_REPO_START, FETCH_REPO_SUCCESS} from './actionTypes'
import {GET_REPO_INFO} from '../../graphql/queries'
import graphqlClient from '../../graphql/graphqlClient'


export function fetchRepoInfo() {
  return async dispatch => {
    dispatch(fetchRepoStart())
    try {
      const res = await graphqlClient.query({query: GET_REPO_INFO})

      dispatch(fetchRepoInfoSuccess(res.data))
    } catch (e) {
      dispatch(fetchRepoError(e))
    }
  }
}

export function fetchRepoInfoSuccess(data) {
  return {
    type: FETCH_REPO_SUCCESS,
    repoInfo: data
  }
}

export function fetchRepoStart() {
  return {
    type: FETCH_REPO_START
  }
}

export function fetchRepoError(e) {
  return {
    type: FETCH_REPO_ERROR,
    error: e
  }
}
