import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHistory} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import React from 'react'
import {Media} from 'react-bootstrap'

export const commitsList = (commits) => (
  <>
    <h5>Total commits number:&nbsp;{commits.totalCount}</h5>
    <h5>Last commits:&nbsp;</h5>
    <ul className="list-unstyled">
      {commits.edges.map((el, key) => (
        <Media className={['p-2', key % 2 ? 'bg-dark text-white rounded' : ''].join(' ')} as="li" key={key}>
          <FontAwesomeIcon className="mx-2 my-auto" color={key % 2 ? 'white' : 'grey'} size="1x" icon={faHistory}/>
          <Media.Body>
            <div className="d-flex">
              <b className="flex-grow">{el.node.messageHeadline}</b>&nbsp;
              <a className="ml-auto text-reset text-truncate" target="_blank" rel="noopener noreferrer"
                 href={el.node.commitUrl}>
                <i>#{el.node.oid}</i>
              </a>
            </div>
            <i>Committed at:&nbsp;{moment(el.node.committedDate).format('MM/DD/YYYY h:mma')}</i>
          </Media.Body>
        </Media>
      ))}
    </ul>
  </>
)
