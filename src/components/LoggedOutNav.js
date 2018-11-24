import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class LoggedOutNav extends Component {

  state = {}

  render(){
      return(
        <Fragment>
        <div className="logged-in">
        <ul className="heading">
        <li>
          <NavLink className="button head-button" exact to="/">
          Subtle
          </NavLink>
        </li>
        </ul>
        <div className="user-action">
          <NavLink className="button" exact to="/login">
            Log In
          </NavLink>
          <NavLink className="button" exact to="/signup">
            Sign Up
          </NavLink>
          </div>
          </div>
        </Fragment>
    )
  }
}





export default withRouter (LoggedOutNav)
