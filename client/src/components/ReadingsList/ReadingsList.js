import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import Loader from '../table/Loader/Loader'
import {readingsList} from './ReadingsList.functions'

const ReadingsList = (props) => {
  const {loaded, readings, fetchReadings} = props
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReadings().then(() => {
      setLoading(false)
    })
  }, [])


  if (loading) {
    return <Loader/>
  } else {
    console.log('readings: ', readings)
    return (
      <Container className="px-2 my-1">
        {readingsList(readings)}
      </Container>
    )
  }
}
export default ReadingsList

