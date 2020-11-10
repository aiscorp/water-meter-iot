import React, {useEffect} from 'react'
import AboutAlert from '../components/AboutAlert/AboutAlert'
import ShowMarkdown from '../components/ShowMarkdown/ShowMarkdown'
import Loader from '../components/table/Loader/Loader'
import {connect} from 'react-redux'
import {fetchRepoInfo} from '../store/actions/repo'
import {Container, ProgressBar, Row} from 'react-bootstrap'
import RepoInfo from '../components/RepoInfo/RepoInfo'

const AboutPage = props => {
  const {loading, repoInfo, fetchRepoInfo} = props
  const repoUrl = 'https://github.com/aiscorp/water-meter-iot'
  const readmePath = 'https://raw.githubusercontent.com/aiscorp/water-meter-iot/master/README.md'

  useEffect(() => {
    fetchRepoInfo()
  }, [])



  if (loading) {
    return <Loader/>
  } else {
    return (
      <Container className="my-2">
        <AboutAlert repoUrl={repoUrl}/>
        <RepoInfo repoInfo={repoInfo}/>
        <ShowMarkdown markdownUrl={readmePath}/>
      </Container>
    )
  }
}

// export default AboutPage

function mapStateToProps(state) {
  return {
    repoInfo: state.repo.repoInfo,
    loading: state.repo.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepoInfo: () => dispatch(fetchRepoInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
