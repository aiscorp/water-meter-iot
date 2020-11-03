import React from 'react'

const UserInfo = (props) => {
  const {user} = props
  const userBlank = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zip: ''
    },
    description: ''
  }
  const currentUser = {...userBlank, ...user}

  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">

      <p>Выбран пользователь&nbsp;
        <b>{currentUser.firstName}&nbsp;{currentUser.lastName}</b>
      </p>
      <div className="form-group row">
        <label htmlFor="description" className="col-sm-2 col-form-label">Описание:</label>
        <div className="col-sm-10">
          <textarea className="form-control" id="description" disabled value={currentUser.description}/>
        </div>
      </div>

      <p>Адрес проживания: <b>{currentUser.address.streetAddress}</b></p>
      <p>Город: <b>{currentUser.address.city}</b></p>
      <p>Провинция/штат: <b>{currentUser.address.state}</b></p>
      <p>Индекс: <b>{currentUser.address.zip}</b></p>
    </div>
  )
}
export default UserInfo
