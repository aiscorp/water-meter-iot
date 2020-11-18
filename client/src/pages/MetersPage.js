import React from 'react'
import {connect} from 'react-redux'
import {fetchMeters} from '../store/actions/meters'
import MetersList from '../components/MetersList/MetersList'
import {Container} from 'react-bootstrap'

const MetersPage = props => {
  const {meters, fetchMeters} = props


  return (
    <Container className="my-2">
      <MetersList meters={meters} fetchMeters={fetchMeters}/>
    </Container>
  )
}

const mapStateToProps = state => ({
  meters: state.meters.meters,
  loading: state.meters.loading
})

const mapDispatchToProps = {
  fetchMeters
}

export default connect(mapStateToProps, mapDispatchToProps)(MetersPage)
