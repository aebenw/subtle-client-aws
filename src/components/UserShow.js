import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import ChannelContainer from '../containers/ChannelContainer'

import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'


const UserShow = (props) => {
  const { userShow, currentUserId, addFriend, rmFriend } = props
  const isFriend = props.friendly()
    return (
      <Fragment>
      {userShow ?
        <Fragment>

          <div className="row">
            <div className="col-sm-3"><h1>{userShow.name}'s Profile</h1></div>
            <div className="col-sm-offset-9">
              {isFriend ? <button class="inverse" onClick={() => rmFriend(currentUserId, userShow)} >Remove Friend</button> : <button onClick={() => addFriend(currentUserId, userShow.id)} className="inverse">Add Friend</button>}</div>
          </div>
          <ChannelContainer channels={userShow.channels} />
        </Fragment>
      :
      <div className="spinner"></div>
    }
    </Fragment>
    )
}

const friendly = (state, user) => {
  return state.find(x => x.id === user) ? true : false
}


const mapStateToProps = (state, ownProps) => {
  return {
    userShow: state.users.userShow,
    currentUserId: state.users.currentUser.id,
    friendly: () => friendly(state.users.currentUser.friends, ownProps.history.location.state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (currUser, user) => {
      return dispatch(addFriend(currUser, user))
    },
    rmFriend: (currUser, user) => {
      return dispatch(rmFriend(currUser, user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow))
