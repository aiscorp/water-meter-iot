import React, {useEffect, useState} from 'react'
import {collabStat, langStat, repoHeader} from './RepoInfo.functions'
import {Container} from 'react-bootstrap'
import Loader from '../table/Loader/Loader'

const RepoInfo = (props) => {
  const {repoInfo, fetchRepoInfo} = props
  const {repository} = props.repoInfo

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRepoInfo().then(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loader/>
  } else {
    return (
      <Container className="px-2 my-1">
        {repoHeader(repository)}
        {langStat(repository.languages, repository.languages.totalSize)}
        {collabStat(repository.collaborators)}
      </Container>
    )
  }
}
export default RepoInfo


