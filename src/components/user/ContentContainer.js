import React from 'react'
import { connect } from 'react-redux'

import {UserFriendContainer, FriendContainer} from '../../containers/UserContainer'
import ChannelContainer from '../../containers/ChannelContainer'

const ContentContainer = ({view, user, currentUserId}) => {

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

const mapState = (state) => {
  return {
    currentUserId: state.users.currentUser.id
  }
}


export default connect(mapState)(ContentContainer)
