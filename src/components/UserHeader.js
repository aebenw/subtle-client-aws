import React,{ Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'

const header = ({userShow, currentUserId, addFriend, rmFriend, friendly, history }) => {
  const isFriend = friendly()
  return (
      <Fragment>
      {userShow ?
    <div className="container">
    <div className="row">
      <div className="col-5-sm">
        <h1>{userShow.name}</h1>
      </div>
      <div className="col-sm-offset-9">
          {isFriend ? <button className="inverse" onClick={() => {rmFriend(currentUserId, userShow.id); history.goBack()}} >Remove Friend</button> : <button onClick={() => addFriend(currentUserId, userShow.id)} className="inverse">Add Friend</button>}
      </div>
    </div>
      <div className="row">
        <div className="col-3-sm">
          <h4>Channels</h4>
        </div>
        <div className="col-3-sm">
          <h4>Freinds</h4>
        </div>
        <div className="col-3-sm">
          <h4>Channels</h4>
        </div>
      </div>
    </div>
    : null }
    </Fragment>
  )
}

const friendly = (state, user) => {
  return state.find(x => x.id === user) ? true : false
}


const mapStateToProps = (state, ownProps) => {
  return {
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





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(header))

// <div className="row">
//       <div className="col-sm-3" style={{"text-align": "left", display: "inline" }}><h1>{userShow.name}'s Profile</h1></div>
//
// </div>
