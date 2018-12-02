import React,{ Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


import {followChannel, unFollowChannel, deleteChannel, rmCurrChannel } from '../../store/actions/channels'

import Title from './Title'
import FollowUnfollow from './FollowUnfollow'
import Column from './Column'


//LINKS
import {ColAuthor} from '../links/Author'





const ChannelHeader = ({currentChannel, currentUserId, amFollowing, isMine, followChannel, unFollowChannel, deleteChannel, rmChannel, history}) => {
  let following = amFollowing()

  return (
  <Fragment>
    <div className="container profile">
      <div className="row">
        <Title content={currentChannel.name}/>
      {isMine() ?
        <FollowUnfollow method={() => deleteThisChannel(currentChannel.id, deleteChannel, history, rmCurrChannel)} content={'Delete Channel'}/>
        :
        <Fragment>
          { following ?
            <FollowUnfollow method={() => unFollowChannel(currentUserId, currentChannel.id)} content={"Unfollow"} />
            :
            <FollowUnfollow method={() => followChannel(currentUserId, currentChannel.id)} content={"Follow"} />
          }
        </Fragment>
      }
    </div>

      <div className="row">
        <Column title={"Author"} content={<ColAuthor user={currentChannel.authors[0]}/>}/>
      </div>

    </div>
  </Fragment>
  )
}

const isFollowing = (followers, user) => {
 return followers.find(x => x.id === user) ? true : false
}


const deleteThisChannel = (channel, deleteChannel, history, rmCurrChannel) => {

  deleteChannel(channel)
  .then(() => history.push('/profile'),
  rmCurrChannel())
}

  const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.channels.currentChannel,
    currentUserId: state.users.currentUser.id,
    amFollowing: () => isFollowing(state.channels.currentChannel.followers, state.users.currentUser.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    followChannel: (user, channel) => {
      return dispatch(followChannel(user, channel))
    },
    unFollowChannel: (user, channel) => {
      return dispatch(unFollowChannel(user, channel))
    },
    deleteChannel: (channel) => {
      return dispatch(deleteChannel(channel))
    },
    rmCurrChannel: () =>
     dispatch(rmCurrChannel())
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader))
