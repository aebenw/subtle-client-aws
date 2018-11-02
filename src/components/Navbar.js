import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Navbar extends Component {

  state = {}

  delteJWT = () => {
    debugger
    localStorage.removeItem("jwt")
    return this.props.history.push('/')
  }

  render(){
    const { activeItem } = this.state

      return(
      <Menu>
        <Menu.Item
          header as={NavLink} exact to="/home"
          active={activeItem === 'editorials'}
        >
          Home
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={() => this.delteJWT()}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(Navbar)
