import React, {useEffect} from 'react'
import AboutAlert from '../components/AboutAlert/AboutAlert'
import ShowMarkdown from '../components/ShowMarkdown/ShowMarkdown'
import Loader from '../components/table/Loader/Loader'
import {connect} from 'react-redux'
import {fetchRepoFirstCommits, fetchRepoInfo, fetchRepoReadme} from '../store/actions/repo'
import {Container, ProgressBar, Row} from 'react-bootstrap'
import RepoInfo from '../components/RepoInfo/RepoInfo'

const AboutPage = props => {
  const {loading, repoInfo, repoReadme, repoCommits, fetchRepoInfo, fetchRepoReadme, fetchRepoFirstCommits} = props
  const repoUrl = 'https://github.com/aiscorp/water-meter-iot'
  const readmePath = 'https://raw.githubusercontent.com/aiscorp/water-meter-iot/master/README.md'
  const file = 'README.MD'

  useEffect(() => fetchRepoInfo(), [])
  // useEffect(() => fetchRepoReadme('README.md'), [])
  // useEffect(() => fetchRepoReadme('nodemcu/readme.md'), [])
  // useEffect(() => fetchRepoReadme('server/readme.md'), [])
  // useEffect(() => fetchRepoReadme('client/README.md'), [])
  useEffect(() => fetchRepoFirstCommits(), [])

  // DEBUG
  // console.log('AboutPage.fetchRepoReadme(README.MD):', repoReadme)
  console.log('AboutPage.fetchRepoFirstCommits():', repoCommits)

  if (loading) {
    return <Loader/>
  } else {
    return (
      <Container className="my-2">
        <AboutAlert repoUrl={repoUrl}/>
        {/*<RepoInfo repoInfo={repoInfo}/>*/}
        <ShowMarkdown markdownUrl={readmePath}/>
      </Container>
    )
  }
}

// export default AboutPage

function mapStateToProps(state) {
  return {
    repoInfo: state.repo.repoInfo,
    repoReadme: state.repo.repoReadme,
    repoCommits: state.repo.repoCommits,
    loading: state.repo.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepoInfo: () => dispatch(fetchRepoInfo()),
    fetchRepoReadme: (file) => dispatch(fetchRepoReadme(file)),
    fetchRepoFirstCommits: () => dispatch(fetchRepoFirstCommits())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
