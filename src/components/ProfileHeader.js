import React,{ Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'
import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'


import ProfilePic from './header/ProfilePic'
import Column from './header/Column'
import Title from './header/Title'
import FollowUnfollow from './header/FollowUnfollow'
import Edit from './buttons/Edit'

import { NO_PROFILE } from '../constants'





const header = ({ user, showChannel, userShow, currentUser, addFriend, rmFriend, friendly, history, changeView, view }) => {
  let isFriend
  if (user.id !== currentUser.id){ isFriend = friendly() }
  return (
    <Fragment>

      <div className="container profile">
        <div className="row">
          <Title content={user.name} />
          { user.id === currentUser.id ?
              <div className="col-sm-offset-7">
                <Edit content={"profile"} />
              </div>
          :
          <Fragment>
            { isFriend ?
            <FollowUnfollow method={() => rmFriend(currentUser.id, user.id)} content={'Remove Friend'}  /> :
            <FollowUnfollow method={() => addFriend(currentUser.id, user.id)} content={'Add Friend'} />
          }
        </Fragment>
        }
      </div>
        { user.file ?
        <ProfilePic src={user.file}/>
        :
        <ProfilePic src={NO_PROFILE}/>}

        <div className="row">
            {user.description ?
            <Column title={"Bio"} content={user.description}/>
            :
            <Column title={"Bio"} content={'No Bio available'}/>
            }
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
    currentUser: state.users.currentUser,
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
