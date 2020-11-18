import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import Loader from '../table/Loader/Loader'
import {metersList} from './MetersList.functions'

const MetersList = (props) => {
  const {meters, fetchMeters} = props

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMeters().then(() => {
      setLoading(false)
    })
  }, [fetchMeters])

  if (loading) {
    return <Loader/>
  } else {
    return (
      <Container className="px-2 my-1">
        {metersList(meters)}
      </Container>
    )
  }
}
export default MetersList

