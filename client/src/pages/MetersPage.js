import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchMeters} from '../store/actions/meters'
import MetersList from '../components/MetersList/MetersList'
import {Container} from 'react-bootstrap'

const MetersPage = props => {
  const {loading, meters, fetchMeters} = props


  return (
    <Container className="my-2">
      <MetersList meters={meters} fetchMeters={fetchMeters}/>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    meters: state.meters.meters,
    loading: state.meters.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMeters: () => dispatch(fetchMeters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetersPage)
