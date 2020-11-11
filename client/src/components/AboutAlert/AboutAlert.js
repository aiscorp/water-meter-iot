import React, {useState} from 'react'
import {Alert} from 'react-bootstrap'

const AboutAlert = (props) => {
  const {repoUrl} = props
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <>
        <Alert variant="info" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>More info:</Alert.Heading>
          This page uses <code>GraphQL and Apollo</code> for Github API connection.
          You can get more information about project
          and view app's code on those Github repos by&nbsp;
          <a target="_blank" rel="noopener noreferrer" href={repoUrl}>link</a>.
        </Alert>
      </>
    )
  }
  return null
}
export default AboutAlert
