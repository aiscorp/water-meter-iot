import {
  FETCH_REPO_ERROR, FETCH_REPO_FIRST_COMMITS_SUCCESS,
  FETCH_REPO_README_SUCCESS, FETCH_REPO_START,
  FETCH_REPO_SUCCESS
} from './actionTypes'
import {GET_REPO_FIRST_COMMITS, GET_REPO_INFO, GET_REPO_README} from '../../graphql/queries'
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

export function fetchRepoReadme(file) {
  return async dispatch => {
    dispatch(fetchRepoStart())
    try {
      const res = await graphqlClient.query(
        {
          query: GET_REPO_README,
          variables: {
            file: `master:${file}`
          }
        })

      console.log(`Query(master:${file}):`,
        {[file]: res.data.repository.object}) // DEBUG

      dispatch(fetchRepoReadmeSuccess(
        {[file]: res.data.repository.object}))
    } catch (e) {
      dispatch(fetchRepoError(e))
    }
  }
}

export function fetchRepoFirstCommits() {
  return async dispatch => {
    dispatch(fetchRepoStart())
    try {
      const res = await graphqlClient.query({query: GET_REPO_FIRST_COMMITS})

      dispatch(fetchRepoFirstCommitsSuccess(res.data.repository.ref.target.history))
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

export function fetchRepoReadmeSuccess(data) {
  return {
    type: FETCH_REPO_README_SUCCESS,
    repoReadme: data
  }
}

export function fetchRepoFirstCommitsSuccess(data) {
  return {
    type: FETCH_REPO_FIRST_COMMITS_SUCCESS,
    repoCommits: data
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
