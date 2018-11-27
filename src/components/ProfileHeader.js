import React,{ Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchChannel } from '../store/actions/channels'
import {fetchUserInfo} from '../store/actions/users'
import { addFriend } from '../store/actions/users'
import { rmFriend } from '../store/actions/users'

import { NO_PROFILE } from '../constants'





const header = ({ user, showChannel, userShow, currentUser, addFriend, rmFriend, friendly, history, changeView, view }) => {
  let isFriend
  if (user.id !== currentUser.id){ isFriend = friendly() }
  console.log("Profile header")
  return (
    <Fragment>

      <div className="container profile">
        <div className="row">
        <div className="col-5-sm">
          <h1 className="profile">{user.name}</h1>
        </div>
                  { user.id === currentUser.id ?
            <Fragment>


              <div className="col-sm-offset-7">
                <Link to={'user/edit'}>
                  <button className="inverse">Edit Profile</button>
                </Link>
              </div>
            </Fragment>
          :
          <div className="col-sm-offset-7">
            {isFriend ? <button className="inverse" onClick={() => {rmFriend(currentUser.id, user.id)}} >Remove Friend</button> : <button onClick={() => addFriend(currentUser.id, user.id)} className="inverse">Add Friend</button>}
          </div>
          }
          </div>

        <div className="row">
        <div className="col-4-sm">

      {
        user.file ?
          <div  className="profile-pic">
          <img src={user.file} className="section media" alt="profile"/>
        </div>
        :
        <div className="profile-pic" >
          <img src={NO_PROFILE}  className="section media" alt="profile"/>
        </div>
      }
        </div>
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
          </div>
        </div>





      <div className="row">
            <div className="col-12-sm" style={{"margin-left": "2em"}}>

          <button className="button head-button" onClick={() => changeView("channels")}>
            Channels
          </button>
        </div>
        <div className="col-12-sm">
          <button className="button head-button" onClick={() => changeView("myFriends")}>
            Friends
          </button>
        </div>
        <div className="col-12-sm">
          <button className="button head-button" onClick={() => changeView("followedChannels")}>
            Followed Channels
          </button>
        </div>
        { user.id === currentUser.id && view === "channels" ?
        <div className="col-sm-offset-5" style={{ "margin-left": "15.7em"}}>
        <Link to={`/channels/new`}>
        <button className="inverse" >+++++</button>
        </Link>
        </div>
        : null
      }
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
