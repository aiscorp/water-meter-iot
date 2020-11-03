import React from 'react'
import TableSearch from './tableSearch'
import TableHead from './tableHead'
import TableBody from './tableBody'
import TablePaginator from './tablePaginator'
import AddElementForm from './AddElementForm/AddElementForm'
import UserInfo from './UserInfo/UserInfo'

//import classes from "./template.module.scss"

class Table extends React.Component {
  state = {
    isDataSelected: false,
    isShowForm: false,
    data: this.props.data,
    dataFiltred: '',
    searchFilter: '',
    sortDirection: 'asc',
    sortField: 'id',
    selectionRow: null,
    itemsOnPage: 10,
    currentPage: 0,
    headers: ['id', 'firstName', 'lastName', 'email', 'phone'],
    addItem: ''
  }

  componentDidMount() {
    this.sortHandler('none')
  }

  sortHandler = (field) => {
    let sortType = ''

    if (field) {
      if (field === this.state.sortField) {
        sortType = this.state.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        sortType = 'asc'
      }
    }
    if (field === 'none') {
      sortType = this.state.sortDirection
      field = this.state.sortField
    }
    console.log(`Ячейка:${field}, направление:${sortType}`)

    let clonedData = this.state.data.concat()

    let orderedData = clonedData.sort((a, b) => {
      if (a[field] > b[field]) {
        return 1
      }
      if (a[field] < b[field]) {
        return -1
      }
      return 0
    })

    this.setState({
      data: sortType === 'asc' ? orderedData : orderedData.reverse(),
      sortDirection: sortType,
      sortField: field
    })
  }

  selectionHandler = (row) => {
    this.setState({
      selectionRow: row
    })
    document.addEventListener('click', this.deleteActive)
  }

  deleteActive = (e) => {
    const isCell = e.target instanceof HTMLTableCellElement

    if (!isCell) {
      document.removeEventListener('click', this.deleteActive)
      this.setState({selectionRow: null})
    }
  }

  searchHandler = (search) => {
    this.setState({
      searchFilter: search
    })
  }

  paginatorHandler = (page, pages) => {
    let newPage

    if (parseInt(page)) {
      newPage = page - 1
    }
    if (page === '<') {
      newPage = this.state.currentPage - 1 >= 0 ? this.state.currentPage - 1 : 0
    }
    if (page === '>') {
      newPage = this.state.currentPage + 1 <= pages - 1 ? this.state.currentPage + 1 : pages - 1
    }
    if (page === '<<') {
      newPage = 0
    }
    if (page === '>>') {
      newPage = pages - 1
    }

    this.setState({
      currentPage: Number(newPage)
    })
  }

  getFilteredData() {
    const {data, searchFilter} = this.state

    if (!searchFilter) {
      return data
    }

    return data.filter((item) => {
      return (
        item['firstName'].toLowerCase().includes(searchFilter.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(searchFilter.toLowerCase()) ||
        item['email'].toLowerCase().includes(searchFilter.toLowerCase()) ||
        item['phone'].toLowerCase().includes(searchFilter.toLowerCase())
      )
    })
  }

  AddElementHandler = (element) => {
    this.setState({
      addItem: element
    })
  }




  CheckElementForAdd(arr) {
    if (this.state.addItem !== '') {
      arr.unshift(this.state.addItem)
      this.setState({
        addItem: ''
      })
    }
  }


  render() {
    const filteredData = this.getFilteredData()
    if (filteredData[0] !== this.state.addItem)
      this.CheckElementForAdd(filteredData)

    const userInfo = this.state.selectionRow ?
      <UserInfo user={this.state.selectionRow}/> : ''

    return (
      <>
        <div className="container">
          <TableSearch searchHandler={this.searchHandler}/>
          <div className="table-responsive">
            <table className="table table-hover">
              <TableHead
                headers={this.state.headers}
                sortHandler={this.sortHandler}
                sortDirection={this.state.sortDirection}
                sortField={this.state.sortField}
              />
              <TableBody
                data={filteredData.slice(0 + this.state.currentPage * 10, 10 + this.state.currentPage * 10)}
                selectionHandler={this.selectionHandler}
                searchFilter={this.state.searchFilter}
              />
            </table>
          </div>


          <div className="row">
            <div className="col-sm-8">
              <TablePaginator
                itemsCount={filteredData.length}
                currentPage={this.state.currentPage}
                paginatorHandler={this.paginatorHandler}
                itemsOnPage={this.state.itemsOnPage}
              />
            </div>
            <div className="col-sm-4">

              <button type="button" className="btn btn-block btn-primary" data-toggle="modal"
                      data-target="#addModalForm">
                Добавить
              </button>
            </div>
          </div>

          {userInfo}

        </div>

        <AddElementForm handleSubmitElement={this.AddElementHandler}/>
      </>
    )
  }
}

export default Table
