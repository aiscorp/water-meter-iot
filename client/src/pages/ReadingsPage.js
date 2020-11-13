import React from 'react'
import {connect} from 'react-redux'
import {Container} from 'react-bootstrap'
import {fetchReadings} from '../store/actions/readings'
import ReadingsList from '../components/ReadingsList/ReadingsList'


const ReadingsPage = props => {
  const {readings, fetchReadings} = props


  return (
    <Container className="my-2">
      <ReadingsList readings={readings} fetchReadings={fetchReadings}/>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    readings: state.readings.readings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReadings: () => dispatch(fetchReadings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingsPage)
