import React,{Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

//Components
import User from '../components/user/user'

//Actions
import {fetchUserInfo} from '../store/actions/users'



const UserContainer = ({ users, userShow, type }) => {


  return(
    <Fragment>
    {users ?
    <div id="user-feed" className="row">
        {users.map(user => <User key={user.id} user={user} userShow={userShow}/>)}
    </div>
    : <center><div style={{"margin-top": "10em"}} class="spinner tertiary"></div></center>}

  </Fragment>

  )

}


const mapFriendsToProps = (state) => {
  return {
    users: state.users.currentUser.friends,
    type: "FRIEND"
  }
}

const mapUsersToProps = (state) => {
  return {
    users: state.users.currentUser.not_friends,
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
