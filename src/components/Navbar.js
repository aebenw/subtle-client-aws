import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


export default class Navbar extends Component {
  state = {}
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
      </Menu>
    )
  }
}
