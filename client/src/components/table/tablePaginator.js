import React from 'react'

class TablePaginator extends React.Component {

  render() {
    const itemsCount = this.props.itemsCount
    const currentPage = this.props.currentPage+1
    const itemsOnPage = this.props.itemsOnPage
    const pages = Math.ceil(itemsCount/itemsOnPage)

    let paginator=[]
    for (let i = 1; i <= pages ; i++) {
      paginator.push(i);      
    }
/*
    const getStyle=()=>{
      
    }

    const styles={
      next:'',
      prev:'',
      first:'',
      last:'',
      number:''
    }
*/
    let startIndex = (currentPage-3)<=0 ? 0 : (currentPage-3)
    let endIndex = (currentPage+2)>=paginator.length ? paginator.length : (currentPage+2)
    
    const shortList = paginator.slice(startIndex,endIndex)
    shortList.unshift('<<','<')
    shortList.push('>','>>')   
    
    const paginatorList = shortList.map((item) => (
        <li key={item} className={item===currentPage?'page-item active':'page-item'} >
          <button className="page-link" onClick={this.props.paginatorHandler.bind(null, item, pages)}>
            {item}
          </button>
        </li>
    ))

    return (
      <>
        <nav>
          <ul className="pagination justify-content-center">
            {paginatorList}
          </ul>
        </nav>
      </>
    )
  }
}
export default TablePaginator
