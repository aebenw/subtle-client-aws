import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
// import { Menu, Input } from 'semantic-ui-react'
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
          <a href="#" class="logo">Logo   </a>
          <NavLink className="button" exact to="/home">
            Home
          </NavLink>
          <button>Download</button>
        </header>
      // <Menu>
      //   <Menu.Item
      //     header as={NavLink} exact to="/home"
      //     active={activeItem === 'editorials'}
      //   >
      //     Home
      //   </Menu.Item>
      //   <Menu.Menu position='right'>
      //     <Menu.Item>
      //       <Input icon='search' placeholder='Search...' />
      //     </Menu.Item>
      //      <Menu.Item
      //        name='logout'
      //        active={activeItem === 'logout'}
      //        onClick={() => this.delteJWT()}
      //      />
      //   </Menu.Menu>
      // </Menu>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => dispatch({ type: "LOGOUT_USER"})
  }
}



export default withRouter (connect(null, mapDispatchToProps)(LoggedInNav))
