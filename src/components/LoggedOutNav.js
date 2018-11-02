import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class LoggedOutNav extends Component {

  state = {}

  render(){
      return(
        <header>
          <NavLink className="button" exact to="/">
          Subtle
          </NavLink>
          <NavLink className="button" exact to="/login">
            Log In
          </NavLink>
          <NavLink className="button" exact to="/signup">
            Sign Up
          </NavLink>
        </header>
    )
  }
}





export default withRouter (LoggedOutNav)
