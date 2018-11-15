import React, { Component, Fragment } from 'react';
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
        <Fragment>
        <div className="logged-in">
        <ul className="heading">
        <li>
          <NavLink className="button head-button" exact to="/home">
          Subtle
          </NavLink>

          <ul className="dropdown">
          <li>
          <NavLink className="button head-button" exact to="/home">
            Home
          </NavLink>
          </li>
          <li>
          <NavLink className="button head-button" exact to="/profile">
            Profile
          </NavLink>
          </li>
          <li>
          <NavLink className="button head-button" exact to="/friends">
            Friends
          </NavLink>
          </li>
          <li>
          <NavLink className="button head-button" exact to="/explore/people">
            Find Friends
          </NavLink>
          </li>
          </ul>


          </li>
        </ul>

        <button className="button logout" onClick={() => this.delteJWT()}>
          Log Out
        </button>
        </div>
        </Fragment>
    )
  }
}

// <NavLink className="button" exact to="/profile">
// <NavLink className="button" exact to="/friends">
// <NavLink className="button" exact to="/explore/people">



const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => dispatch({ type: "LOGOUT_USER"})
  }
}



export default withRouter (connect(null, mapDispatchToProps)(LoggedInNav))
