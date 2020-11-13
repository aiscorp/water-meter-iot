import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCogs, faFile, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {Media} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export const metersList = (meters) => (
  <>
    <h5>Meters list:&nbsp;</h5>
    <ul className="list-unstyled">
      {meters.map((el, key) => (
        <Media className={['p-2 rounded overlay', key % 2 ? 'bg-secondary text-white' : 'bg-light'].join(' ')} as="li" key={key}>
          <FontAwesomeIcon className="mx-2 my-auto" color={key % 2 ? 'white' : 'grey'} size="1x" icon={faCogs}/>
          <Media.Body>
            <div className="d-flex">
              <b className="flex-grow mr-auto">{el.type}</b>&nbsp;
              <Link to={'/readings/:'+el.id}  className="mr-2 text-reset text-truncate">
                <FontAwesomeIcon color={key % 2 ? 'white' : 'grey'} size="1x" icon={faFile}/>
                &nbsp;Readings
              </Link>
              <Link to={'/meter/unsub/:'+el.id}  className="mr-2 text-reset text-truncate">
                <FontAwesomeIcon color={key % 2 ? 'white' : 'grey'} size="1x" icon={faTimes}/>
                &nbsp;Unsubscribe
              </Link>
              <Link to={'/meter/delete/:'+el.id}  className="text-reset text-truncate">
                <FontAwesomeIcon color={key % 2 ? 'white' : 'grey'} size="1x" icon={faTrash}/>
                &nbsp;Delete
              </Link>
            </div>
            <i>Meter id:&nbsp;{el.id}, Value:&nbsp;<b>{el.value}&nbsp;m3</b></i>
          </Media.Body>

        </Media>
      ))}
    </ul>
  </>
)
