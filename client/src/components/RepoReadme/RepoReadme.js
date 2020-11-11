import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import Loader from '../table/Loader/Loader'
import ShowMarkdown from '../ShowMarkdown/ShowMarkdown'

const RepoReadme = (props) => {
  const {file, repoReadme, fetchRepoReadme} = props

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRepoReadme(file).then(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loader/>
  } else {
    console.log('repoReadme[file].text', repoReadme[file].text)
    return (
      <Container className="px-2 my-1">
        <ShowMarkdown text={repoReadme[file].text}/>
      </Container>
    )
  }
}
export default RepoReadme

