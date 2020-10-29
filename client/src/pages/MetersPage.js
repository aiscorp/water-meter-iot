import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchMeters} from '../store/actions/meters'
import Loader from '../components/table/Loader/Loader'

const MetersPage = props => {
const {loading, meters, fetchMeters} = props

  useEffect(() => {
    fetchMeters()
  }, [])

  const metersHtml = loading ?
    <Loader/> :
    <ul>
      {meters.map(meter => {
        return (
          <li key={meter.id}>
            <b>Id:&nbsp;{meter.id},&nbsp;</b>
            <span>Type:&nbsp;{meter.type},&nbsp;</span>
            <span>Value:&nbsp;{meter.value}</span>
          </li>
        )
      })}
    </ul>

  return (
    <div class="container my-5">
      <div class="col mx-auto">
        <h2 class="text-center">Meters available:</h2>
      </div>
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        {metersHtml}
      </div>
    </div>
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
