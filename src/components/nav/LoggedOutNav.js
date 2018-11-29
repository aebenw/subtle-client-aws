import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class LoggedOutNav extends Component {

  render(){
      return(
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
    )
  }
}


export default withRouter (LoggedOutNav)
