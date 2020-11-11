import {Badge, Media, ProgressBar} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faComment, faHistory, faUser} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import moment from 'moment'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

export const repoHeader = (repository) => (
  <>
    <Media>
      <FontAwesomeIcon className="mr-4" color="grey" size="5x" icon={faGithub}/>
      {/*<img className="mr-2" width={64} height={64} src={repository.owner.avatarUrl}/>*/}
      <Media.Body>
        <h4>Repository name:&nbsp;{repository.name}
          &nbsp;
          <a target="_blank" rel="noopener noreferrer" href={repository.owner.url}>
            <Badge pill as="h5" variant="success">
              <FontAwesomeIcon icon={faUser}/>&nbsp;{repository.owner.login}
            </Badge>{' '}</a></h4>
        <p>
          <i>{repository.description}</i>
        </p>
        <p>
          <FontAwesomeIcon color="grey" icon={faHistory}/>&nbsp;Repo created:&nbsp;
          {moment(repository.createdAt).format('MM/DD/YYYY h:mma')};
          &nbsp;
          <FontAwesomeIcon color="grey" icon={faComment}/>&nbsp;Repo last commit:&nbsp;
          {moment(repository.pushedAt).format('MM/DD/YYYY h:mma')}
          &nbsp;
        </p>
      </Media.Body>
    </Media>
  </>
)

export const langStat = (lang, langSize) => (
  <>
    <h4>Languages statistics:</h4>
    <ProgressBar>
      {lang.edges.map((el, id) => {
        return (
          <ProgressBar style={{background: el.node.color}}
                       now={(el.size * 100 / langSize)}
                       key={id}/>
        )
      })}
    </ProgressBar>
    <ul className="list-inline">
      {lang.edges.map((el, id) => {
        return (
          <li className="list-inline-item mr-3" key={id}>
            <FontAwesomeIcon color={el.node.color} icon={faCircle}/>&nbsp;
            <b>{el.node.name}</b>
            <i>:&nbsp;{el.size} bytes,&nbsp;{(el.size * 100 / langSize).toFixed(0)}%</i>
          </li>
        )
      })}
    </ul>
  </>
)

export const collabStat = (collaborators) => (
  <>
    <h4>Collaborators:</h4>
    <ul className="list-unstyled">
      {collaborators.edges.map((el, id) => {
        return (
          <li className="list-inline-item mr-3" key={id}>
            <img className="mr-2 rounded-circle" width={48} height={48} src={el.node.avatarUrl}/>&nbsp;
            <b>{el.node.name}</b>;&nbsp;&nbsp;
            <a target="_blank" rel="noopener noreferrer" href={el.node.url}>
              <FontAwesomeIcon icon={faUser}/>&nbsp;
              <i>{el.node.login}</i>
            </a>
          </li>
        )
      })}
    </ul>
  </>
)
