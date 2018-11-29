import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import {UserFriendContainer, FriendContainer, ChannelFollowerContainer} from '../containers/UserContainer'
import BlockContainer from '../containers/BlockContainer'
import ChannelContainer from '../containers/ChannelContainer'

const UsContentContainer = ({view, user, currentUserId}) => {

  if(view === "Channels") {
    return (
      <ChannelContainer channels={user.channels} />
    )
  } else if(view === "Friends"){
    return user.id === currentUserId ? <FriendContainer/> : <UserFriendContainer/>

  } else if(view === "Followed Channels"){
    return (
      <ChannelContainer channels={user.channel_follow}/>
    )
  }
}

const ChannelContentContainer = ({view, channel}) => {
  if(view === "Blocks") {
    return (
      <BlockContainer blocks={channel.blocks}/>
    )
  } else if(view === "Followers"){
    return (
      <Fragment>
      {channel.followers[0] ?
      <ChannelFollowerContainer/>
      : <h3>No Followers</h3>}
      </Fragment>
    )
  }
}

const mapState = (state) => {
  return {
    currentUserId: state.users.currentUser.id
  }
}


const UserContentContainer = connect(mapState)(UsContentContainer)

export {
  UserContentContainer,
  ChannelContentContainer
}
