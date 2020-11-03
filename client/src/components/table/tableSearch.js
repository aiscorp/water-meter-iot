import React from 'react'
//import classes from "./template.module.scss"

const TableSearch = (props) => {
  const [value, setValue] = React.useState('')

  const valueChangeHandler = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="input-group mb-3 pt-3 pl-3 pr-3">
      <input
        onChange={valueChangeHandler}
        onKeyPress={(event)=>{
          if(event.key==='Enter')
          {props.searchHandler(value)}
        }}
        type="text"
        className="form-control"
        placeholder="Для поиска введите любую информацию о пользователе..."
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />
      <div className="input-group-append">
        <button
          onClick={() => props.searchHandler(value)}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-search"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
            ></path>
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TableSearch
