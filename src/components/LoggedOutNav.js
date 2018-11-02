import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class LoggedOutNav extends Component {

  state = {}

  render(){
    const { activeItem } = this.state
      return(
      <Menu>
        <Menu.Item
          header as={NavLink} exact to="/"
          active={activeItem === 'home'}
        >
          Home
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>


            <Fragment>
              <Menu.Item
                header as={NavLink} exact to="/login"

            name='login'
            active={activeItem === 'login'}
          > Log In </Menu.Item>
          <Menu.Item
            name='sigUp'
            active={activeItem === 'signUp'}
            header as={NavLink} exact to="/signup"
          > Sign Up </Menu.Item>
        </Fragment>

        </Menu.Menu>
      </Menu>
    )
  }
}





export default withRouter (LoggedOutNav)
