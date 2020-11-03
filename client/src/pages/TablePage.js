import React from 'react'
import Table from '../components/table/table'
import Loader from '../components/table/Loader/Loader'

const TablePage = props => {
  const {isLoaded, data} = props

  if (!isLoaded) {
    return <Loader/>
  } else {
    return (
      <>
        <Table isLoaded={isLoaded} data={data}/>
      </>
    )
  }
}

export default TablePage
