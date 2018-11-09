import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import ChannelContainer from '../containers/ChannelContainer'

import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'


const UserShow = ({ userShow, currentUserId, addFriend, rmFriend, friendly, history }) => {
  const isFriend = friendly()
    return (
      <Fragment>
      {userShow ?
        <Fragment>
          <div className="row">
                <div className="col-sm-3" style={{"text-align": "left", display: "inline" }}><h1>{userShow.name}'s Profile</h1></div>
                <div className="col-sm-offset-9">
              {isFriend ? <button className="inverse" onClick={() => {rmFriend(currentUserId, userShow); history.goBack()}} >Remove Friend</button> : <button onClick={() => addFriend(currentUserId, userShow.id)} className="inverse">Add Friend</button>}</div>
          </div>
          <ChannelContainer channels={userShow.channels} />
        </Fragment>
      :
      <center><div style={{"margin-top": "10em"}} class="spinner tertiary"></div></center>
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
