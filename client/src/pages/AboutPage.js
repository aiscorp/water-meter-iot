import React, {useEffect} from 'react'
import AboutAlert from '../components/AboutAlert/AboutAlert'
import ShowMarkdown from '../components/ShowMarkdown/ShowMarkdown'
import Loader from '../components/table/Loader/Loader'
import {connect} from 'react-redux'
import {fetchRepoInfo} from '../store/actions/repo'

const AboutPage = props => {
  const {loading, repoInfo, fetchRepoInfo} = props



  useEffect(() => {
    fetchRepoInfo()
  }, [])

  const repoUrl = 'https://github.com/aiscorp/water-meter-iot'
  const readmePath = 'https://raw.githubusercontent.com/aiscorp/water-meter-iot/master/README.md'


  const info = loading ?
    <Loader/> : <p>{JSON.stringify(repoInfo)}</p>
    // <ul>
    //   {repoInfo.map(el => {
    //     return (
    //       <li key={el.id}>
    //         <b>Id:&nbsp;{el.id},&nbsp;</b>
    //         <span>Type:&nbsp;{el.type},&nbsp;</span>
    //         <span>Value:&nbsp;{el.value}</span>
    //       </li>
    //     )
    //   })}
    // </ul>

  return (
    <div class="container my-1">
      <AboutAlert repoUrl={repoUrl}/>
      {info}
      <ShowMarkdown markdownUrl={readmePath}/>
    </div>
  )
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
