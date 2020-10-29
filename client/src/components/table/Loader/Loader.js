import React from "react"
import classes from './Loader.module.scss'

const Loader = () => (
  <div className={classes.Loader}>
    <div className={classes["lds-dual-ring"]}></div>
  </div>
)

export default Loader
