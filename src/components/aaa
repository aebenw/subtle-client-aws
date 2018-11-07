import React,{Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import {fetchUserInfo} from '../store/actions/users'



const UserContainer = (props) => {
  let isFriend
  props.type === "FRIEND" ?  isFriend = true : isFriend = false
  return(
    <Fragment>
    {props.friends ?
    <div className="row">
        {props.friends.map(friend => {
        return (
          <div key={friend.id} className="card" onClick={() => props.userShow(friend.id)}>
            <NavLink to={{pathname: `/users/${friend.name}`, state: friend.id}}>
            {friend.name}
          </NavLink>
        </div>
          )
      })}
    </div>
    :
    <div className="spinner"></div>}
    </Fragment>
  )

}


const mapFriendsToProps = (state) => {
  return {
    friends: state.users.currentUser.friends,
    type: "FRIEND"
  }
}

const mapUsersToProps = (state) => {
  return {
    friends: state.users.currentUser.not_friends,
    type: "NOT_FRIEND"
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}


const FriendContainer = withRouter(connect(mapFriendsToProps, mapDispatchToProps )(UserContainer))

const NotFriendContainer = withRouter(connect(mapUsersToProps, mapDispatchToProps )(UserContainer))

export {
  FriendContainer,
  NotFriendContainer
}
