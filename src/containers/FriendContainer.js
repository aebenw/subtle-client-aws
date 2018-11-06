import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import {fetchUserInfo} from '../store/actions/users'



const FriendContainer = (props) => {

  return(
    <div className="row">
  {props.friends.map(friend => {
    console.log(friend)
    return (
      <div key={friend.id} className="card" onClick={() => getUser(friend, props.userShow, props.history)}>
        <Link to={`/user/${friend.name}`}>
        {friend.name}
      </Link>
    </div>
      )
    })}
    </div>
  )

}


const getUser = (user, userShow, history) => {
   userShow(user)
  .then(res => {
    return history.push(`/users/${res.user.name}`)
  })
}

const mapStateToProps = (state) => {
  return {friends: state.users.currentUser.friends}
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps )(FriendContainer))
