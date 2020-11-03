import React from 'react'

const AboutAlert = (props) => {
  const {repoUrl} = props

  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      <h5 className="alert-heading">More info:</h5>
      You can get more information about test task
        and view app's code on those Github repos by&nbsp;
        <a target="_blank" rel="noopener noreferrer" href={repoUrl}>link</a>.
      <button type="button" className="close" data-dismiss="alert">
        <span>&times;</span>
      </button>
    </div>
  )
}
export default AboutAlert
