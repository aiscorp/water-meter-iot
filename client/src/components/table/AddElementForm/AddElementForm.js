import React from 'react'

const AddElementForm = props => {
  const {handleSubmitElement} = props

  let inputId = React.createRef()
  let inputFirstName = React.createRef()
  let inputLastName = React.createRef()
  let inputEmail = React.createRef()
  let inputPhone = React.createRef()

  const handleFormSubmit = (event) => {
    const element = {
      id: inputId.current.value,
      firstName: inputFirstName.current.value,
      lastName: inputLastName.current.value,
      email: inputEmail.current.value,
      phone: inputPhone.current.value
    }

    handleSubmitElement(element)
  }

  return (
    <div className="modal fade" id="addModalForm" tabIndex="-1" role="dialog"
         aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content px-3">
          <form>
            <div className="modal-header">
              <h5 className="modal-title">Add row to table</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group row">
                <label htmlFor="id">Id:</label>
                <input ref={inputId} type="number" className="form-control" id="id"
                       placeholder="Enter id"/>
              </div>
              <div className="form-group row">
                <label htmlFor="firstName">First name:</label>
                <input ref={inputFirstName} type="firstName" className="form-control" id="firstName"
                       placeholder="Enter first name"/>
              </div>
              <div className="form-group row">
                <label htmlFor="lastName">Last name:</label>
                <input ref={inputLastName} type="lastName" className="form-control" id="lastName"
                       placeholder="Enter last name"/>
              </div>
              <div className="form-group row">
                <label htmlFor="email">Email address:</label>
                <input ref={inputEmail} type="email" className="form-control" id="email"
                       placeholder="Enter email"/>
              </div>
              <div className="form-group row">
                <label htmlFor="phone">Phone number:</label>
                <input ref={inputPhone} type="phone" className="form-control" id="phone"
                       placeholder="Phone number (xxx)xxx-xxxx"/>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleFormSubmit} className="btn btn-primary disabled " data-dismiss="modal">
                Add to table
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddElementForm
