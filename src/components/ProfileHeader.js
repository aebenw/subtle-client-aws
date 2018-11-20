import React,{ Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'
import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'




const header = ({ user, showChannel, userShow, currentUserId, addFriend, rmFriend, friendly, history, changeView }) => {
  let isFriend
  if (user.id !== currentUserId){ isFriend = friendly() }
  return (
    <Fragment>

      <div className="container profile">
          <div className="row">
          <div className="col-4-sm">

      {
        user.file ?
          <div  className="profile-pic user-card">
          <img src={user.file} className="section media" alt="profile"/>
        </div>
        :
        <div className="card user-card" >
        <div className="section">
          <h3> {user.name[0]}</h3>
        </div>
        </div>
      }
        </div>
      </div>

      <div className="row">
        <div className="col-5-sm">
            <h1 className="profile">{user.name}</h1>
          </div>
          { user.id === currentUserId ?
            <Fragment>


              <div className="col-sm-offset-9">
                <Link to={'user/edit'}>
                  <button className="inverse">Edit Profile</button>
                </Link>
              </div>
            </Fragment>
          :
          <div className="col-sm-offset-9">
            {isFriend ? <button className="inverse" onClick={() => {rmFriend(currentUserId, user.id)}} >Remove Friend</button> : <button onClick={() => addFriend(currentUserId, user.id)} className="inverse">Add Friend</button>}
          </div>
          }
        </div>
        <div className="row">
          <div className="col-6-sm">
            <h4 className="profile">Bio</h4>
            {user.description ?
              <p> {user.description} </p>
            :
            <p>No Bio available</p>
            }
          </div>


        <div className="col-5-sm">

        { user.id === currentUserId ?
        <div className="col-sm-offset-9" style={{"paddingLeft": "230px"}}>
        <Link to={`/channels/new`}>
        <button className="inverse" >+++++</button>
        </Link>
        </div>
        : null
      }
        </div>
      </div>
      <div className="row">
        <div className="col-12-sm">
          <div className="logged-in">

          <button className="button head-button" onClick={() => changeView("channels")}>
            Channels
          </button>

          <button className="button head-button" onClick={() => changeView("myFriends")}>
            Friends
          </button>

          <button className="button head-button" onClick={() => changeView("followedChannels")}>
            Followed Channels
          </button>
        </div>
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
