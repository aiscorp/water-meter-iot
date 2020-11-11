import React, {useState} from 'react'
import AboutAlert from '../components/AboutAlert/AboutAlert'
import {connect} from 'react-redux'
import {fetchRepoFirstCommits, fetchRepoInfo, fetchRepoReadme} from '../store/actions/repo'
import {Container, Tabs, Tab} from 'react-bootstrap'
import RepoInfo from '../components/RepoInfo/RepoInfo'
import RepoCommits from '../components/RepoCommits/RepoCommits'
import RepoReadme from '../components/RepoReadme/RepoReadme'

const AboutPage = props => {
  const {repoInfo, repoReadme, repoCommits, fetchRepoInfo, fetchRepoReadme, fetchRepoFirstCommits} = props
  const repoUrl = 'https://github.com/aiscorp/water-meter-iot'

  const [key, setKey] = useState('info')

  return (
    <Container className="my-2">
      <AboutAlert repoUrl={repoUrl}/>
      <Tabs className="" mountOnEnter={true} activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="info" title="Git information">
          <RepoInfo repoInfo={repoInfo} fetchRepoInfo={fetchRepoInfo}/>
        </Tab>
        <Tab eventKey="commits" title="Commits">
          <RepoCommits repoCommits={repoCommits} fetchRepoFirstCommits={fetchRepoFirstCommits}/>
        </Tab>
        <Tab eventKey="readme1" title="Main readme">
          <RepoReadme file='README.md' repoReadme={repoReadme} fetchRepoReadme={fetchRepoReadme}/>
        </Tab>
        <Tab eventKey="readme2" title="Device readme">
          <RepoReadme file='nodemcu/readme.md' repoReadme={repoReadme} fetchRepoReadme={fetchRepoReadme}/>
        </Tab>
        <Tab eventKey="readme3" title="Server readme">
          <RepoReadme file='server/readme.md' repoReadme={repoReadme} fetchRepoReadme={fetchRepoReadme}/>
        </Tab>
        <Tab eventKey="readme4" title="Frontend readme">
          <RepoReadme file='client/README.md' repoReadme={repoReadme} fetchRepoReadme={fetchRepoReadme}/>
        </Tab>
      </Tabs>

    </Container>
  )
}

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
