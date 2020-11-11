import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import Loader from '../table/Loader/Loader'
import {commitsList} from './RepoCommits.functions'

const RepoCommits = (props) => {
  const {repoCommits, fetchRepoFirstCommits} = props

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRepoFirstCommits().then(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loader/>
  } else {

    return (
      <Container className="px-2 my-1">
        {commitsList(repoCommits)}
      </Container>
    )
  }
}
export default RepoCommits

