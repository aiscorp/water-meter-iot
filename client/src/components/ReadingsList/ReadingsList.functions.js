import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {Media} from 'react-bootstrap'
import moment from 'moment'

export const readingsList = (readings) => (
  <>
    <h5>Readings list:&nbsp;</h5>
    <ul className="list-unstyled">
      {readings.map((el, key) => (
        <Media className={['p-2 rounded overlay', key % 2 ? 'bg-secondary text-white' : 'bg-light'].join(' ')} as="li"
               key={key}>
          <FontAwesomeIcon className="mx-2 my-auto" color={key % 2 ? 'white' : 'grey'} size="1x" icon={faFile}/>
          <Media.Body className="d-flex">
            <b className="flex-grow mr-auto">Value:&nbsp;{el.value}, Delta:&nbsp;{el.delta}</b>&nbsp;
            <i>Date:&nbsp;{moment(el.time).format('MM/DD/YYYY h:mma')}, Meter id:&nbsp;{el.id}</i>
          </Media.Body>
        </Media>
      ))}
    </ul>
  </>
)
