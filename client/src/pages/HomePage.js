import React, {useEffect, useState} from 'react'
import AboutAlert from '../components/AboutAlert/AboutAlert'
import {connect} from 'react-redux'
import {fetchRepoFirstCommits, fetchRepoInfo, fetchRepoReadme} from '../store/actions/repo'
import {Container, Tabs, Tab, Button} from 'react-bootstrap'
import RepoInfo from '../components/RepoInfo/RepoInfo'
import RepoCommits from '../components/RepoCommits/RepoCommits'
import RepoReadme from '../components/RepoReadme/RepoReadme'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const HomePage = props => {
  const {history} = props
  const [user1, setUser1] = useState({status: 'no login'})
  const [user2, setUser2] = useState({status: 'no login'})

  const login = () => {
    window.location.href = `${window.ENV.serverUrl}auth/google`
    // axios.get(`${window.ENV.serverUrl}auth/google`, {})
    //   .then(res => setUser1(res.data))
    //   .catch(e => console.log(e))
  }
  const logout = () => {
    window.location.href = `${window.ENV.serverUrl}auth/logout`
  }

  useEffect(() => {
    axios.get(`${window.ENV.serverUrl}api/user`, {withCredentials: true})
      .then(res => setUser2(res.data))
      .catch(e => console.log(e))
  }, [])


  return (
    <Container className="my-2">

      <Button onClick={login}>
        Log In by Google
      </Button>

      <Button onClick={logout}>
        Log Out by Google
      </Button>


      <p>Status for button pushed: {JSON.stringify(user1)}</p>
      <p>Status on server: {JSON.stringify(user2)}</p>

    </Container>
  )
}

// const mapStateToProps =state => ({
//   repoInfo: state.repo.repoInfo,
//   repoReadme: state.repo.repoReadme,
//   repoCommits: state.repo.repoCommits,
//   loading: state.repo.loading
// })
//
//
// const mapDispatchToProps = {
//   fetchRepoReadme,
//   fetchRepoFirstCommits,
//   fetchRepoInfo
// }

// export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
export default HomePage
