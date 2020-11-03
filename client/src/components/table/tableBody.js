import React from 'react'



class TableBody extends React.Component {
  
  Hightlight = (item, filter) => {
    const str = String(item)
    if (!filter) return str
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)
    if (matchValue) {
      return str.split(regexp).map((s, index, array) => {
        if (index < array.length - 1) {
          const c = matchValue.shift()
          return (
            <span key={Math.random()}>
              {s}
              <span className={'bg-warning'}>{c}</span>
            </span>
          )
        }
        return s
      })
    }
    return str
  }

  render() {
    const usersList = this.props.data.map((user) => (
      <tr key={user.id+Math.random()} onClick={this.props.selectionHandler.bind(null, user)}>
        <td>{user.id}</td>
        <td>{this.Hightlight(user.firstName, this.props.searchFilter)}</td>
        <td>{this.Hightlight(user.lastName, this.props.searchFilter)}</td>
        <td>{this.Hightlight(user.email, this.props.searchFilter)}</td>
        <td>{this.Hightlight(user.phone, this.props.searchFilter)}</td>
      </tr>
    ))
    return <tbody>{usersList}</tbody>
  }
}
export default TableBody
