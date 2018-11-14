import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class LoggedInNav extends Component {

  state = {}



  delteJWT = () => {
    localStorage.removeItem("jwt")
    this.props.logOutAction()
    return this.props.history.push('/')
  }

  render(){
    // const { activeItem } = this.state
      return(
        <header>
          <NavLink className="button" exact to="/home">
          Subtle
          </NavLink>
          <ul className="dropdown">
          <li>
          <NavLink className="button" exact to="/home">
            Home
          </NavLink>
          </li>
          <li>
          <NavLink className="button" exact to="/profile">
            My Profile
          </NavLink>
          </li>
          <li>
          <NavLink className="button" exact to="/friends">
            Friends
          </NavLink>
          </li>
          <li>
          <NavLink className="button" exact to="/explore/people">
            Find Friends
          </li>
          </ul>
          </NavLink>
          <button className="button" onClick={() => this.delteJWT()}>
            Log Out
          </button>
        </header>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => dispatch({ type: "LOGOUT_USER"})
  }
}



export default withRouter (connect(null, mapDispatchToProps)(LoggedInNav))
