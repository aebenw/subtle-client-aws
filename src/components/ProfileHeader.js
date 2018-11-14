import React,{ Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { lister } from '../functions/index'

import { fetchChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'
import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'




const header = ({user, showChannel, userShow, currentUserId, friendly}) => {
  let isFriend
  if (user.id === currentUserId){ isFriend = friendly() }

  return (
    <Fragment>

    <div className="container profile">
    <div className="row">
      <div className="col-5-sm">
        <h1 className="profile">{user.name}</h1>
      </div>
      { user.id === currentUserId ?
        null
        :
        <div className="col-sm-offset-9">
            {isFriend ? <button className="inverse" onClick={() => {rmFriend(currentUserId, user.id)}} >Remove Friend</button> : <button onClick={() => addFriend(currentUserId, userShow.id)} className="inverse">Add Friend</button>}
        </div>
      }
    </div>
      <div className="row">
        <div className="col-6-sm">
          <h4 className="profile">Channels</h4>
          <ul>{lister(user.channels, showChannel)}</ul>
        </div>
        <div className="col-6-sm">
          <h4>Friends</h4>
          <ul>{lister(user.friends, userShow)}</ul>
        </div>
      </div>
    </div>

    </Fragment>
  )

}

const friendly = (state, user) => {
  return state.find(x => x.id === user) ? true : false
}


const mapState= (state, ownProps) => {
  return {
    currentUserId: state.users.currentUser.id,
    friendly: () => friendly(state.users.currentUser.friends, ownProps.history.location.state)
  }
}

const mapDispatch = (dispatch) => {
  return {
    showChannel: (channel) => {
      return dispatch(fetchChannel(channel))
    },
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    addFriend: (currUser, user) => {
      return dispatch(addFriend(currUser, user))
    },
    rmFriend: (currUser, user) => {
      return dispatch(rmFriend(currUser, user))
    }
  }
}



export default withRouter(connect(mapState, mapDispatch)(header))
