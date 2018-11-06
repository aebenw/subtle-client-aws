import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import BlockContainer from '../containers/BlockContainer'
import {fetchUserInfo} from '../store/actions/users'



const ChannelShow = (props) => {

    const {currentChannel} = props
    console.log(currentChannel)
    return(
      <Fragment>
      <h1>{currentChannel.name}</h1>
      <h3>Made by: </h3>{currentChannel.users.map(user => <h4 key={user.id} onClick={() => props.userShow(user.id)}><Link to={{pathname: `/users/${user.name}`, state: user.id}}>
      {user.name}
    </Link></h4>)}
      {currentChannel.blocks ?
      <BlockContainer blocks={currentChannel.blocks}/>
      : null
      }
      <Link to={`/blocks/new`}>
        <h2>+++++</h2>
      </Link>
      </Fragment>
    )
}

const mapStateToProps = (state) => {
  return { currentChannel: state.channels.currentChannel }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(ChannelShow))
