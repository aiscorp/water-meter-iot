import React, {useState} from 'react'
import {collabStat, commitStat, langStat, repoHeader} from './RepoInfo.functions'

const RepoInfo = (props) => {
  const {repository} = props.repoInfo

  const [show, setShow] = useState(true)

  return (
    <>
      {repoHeader(repository)}
      {langStat(repository.languages, repository.languages.totalSize)}
      {collabStat(repository.collaborators)}
    </>
  )
}
export default RepoInfo

