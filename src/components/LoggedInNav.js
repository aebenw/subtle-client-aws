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
    const { activeItem } = this.state
      return(
        <header>
          <NavLink className="button" exact to="/home">
          Subtle
          </NavLink>
          <NavLink className="button" exact to="/home">
            Home
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