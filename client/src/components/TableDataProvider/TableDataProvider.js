import React from 'react'
import TablePage from '../../pages/TablePage'

export class TableDataProvider extends React.Component {
  fetchUrl

  constructor(props) {
    super(props)

    if (process.env.NODE_ENV === 'development')
      this.fetchUrl = {
        large: `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
        small: `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
      }

    if (process.env.NODE_ENV === 'production')
      this.fetchUrl = {
        // https://www.mockaroo.com/schemas/260485
        large: `https://api.mockaroo.com/api/847ce770?count=1000&key=beedb770`,
        small: `https://api.mockaroo.com/api/847ce770?count=32&key=beedb770`
      }

    this.state = {
      fetchUrl: props.match.params.size === 'large' ? this.fetchUrl.large : this.fetchUrl.small,
      error: null,
      isLoaded: false,
      data: []
    }
  }

  componentDidMount() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', this.state.fetchUrl, true)
    xhr.onload = () => {
      if (xhr.status !== 200) {
        this.setState({isLoaded: true, error: 'Error'})
        return
      }
      let result = JSON.parse(xhr.response)
      this.setState({isLoaded: true, data: result})
    }
    xhr.send()
  }


  render() {
    const {error, isLoaded, data} = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else {
      return (
        <TablePage isLoaded={isLoaded} data={data}/>
      )
    }
  }
}
