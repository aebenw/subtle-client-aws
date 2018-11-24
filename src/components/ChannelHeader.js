import React,{ Fragment, Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';


import {fetchUserInfo} from '../store/actions/users'
import {followChannel, unFollowChannel, deleteChannel, rmCurrChannel, fetchChannel} from '../store/actions/channels'








class ChannelHeader extends Component {

   delete = (channel) => {
    const { deleteChannel, history, rmCurrChannel } = this.props

    deleteChannel(channel)
    .then(() => history.push('/profile'),
    rmCurrChannel())
  }

   amFollowing = () => {
    const { currentChannel, currentUserId, followChannel, unFollowChannel } = this.props
     if (currentChannel.followers.find(x => x.id === currentUserId)){
      return(
        <div className="col-sm-offset-9">
        <button className="inverse" onClick={() => {unFollowChannel(currentUserId, currentChannel.id)}}>Unfollow Channel</button>
        </div>
      )
    } else {
      return (
        <div className="col-sm-offset-9">
        <button className="inverse" onClick={() => {followChannel(currentUserId, currentChannel.id)}}>Follow Channel</button>
        </div>
        )
      }
    }

  render(){
    const {currentChannel, showChannel, isMine, userShow, currentUserId, friendly, history, changeView, view} = this.props
  return (
  <Fragment>
  <div className="container profile">
    <div className="row">
      <div className="col-5-sm">
        <h3> Channel </h3>
        <Link to={{pathname: `/users/${currentChannel.authors[0].id}`, state: currentChannel.authors[0].id}}>
        <h4 onClick={() => userShow(currentChannel.authors[0].id)}>
          {currentChannel.authors[0].name}
        </h4>
      </Link>
      <h4>/{currentChannel.name}</h4>
    </div>

    {isMine() ?
      <div className="col-sm-offset-9">
      <button className="inverse" onClick={() => this.delete( currentChannel.id)}>Delete Channel</button>
        </div>
    :
      this.amFollowing()
    }
    </div>
  </div>
  <div className="row">
        <div className="col-12-sm" style={{"margin-left": "2em"}}>

      <button className="button head-button" onClick={() => changeView("blocks")}>
        Blocks
      </button>
    </div>
    <div className="col-12-sm">
      <button className="button head-button" onClick={() => changeView("followers")}>
        Followers
      </button>
    </div>
    { (isMine() || !currentChannel.private) && view === "blocks" ?
    <div className="col-sm-offset-5" style={{ "margin-left": "15.7em"}}>
    <Link to={`/blocks/new`}>
    <button className="inverse" >+++++</button>
    </Link>
    </div>
    : null
  }
  </div>
  </Fragment>
  )}
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentChannel: state.channels.currentChannel,
    currentUserId: state.users.currentUser.id,
    isMine: () => state.channels.currentChannel.authors.find(x => x.id === state.users.currentUser.id) ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userShow: (user) => {
      return dispatch(fetchUserInfo(user))
    },
    followChannel: (user, channel) => {
      return dispatch(followChannel(user, channel))
    },
    unFollowChannel: (user, channel) => {
      return dispatch(unFollowChannel(user, channel))
    },
    deleteChannel: (channel) => {
      return dispatch(deleteChannel(channel))
    },
    rmCurrChannel: () =>
     dispatch(rmCurrChannel()),

    showChannel: (channel) =>
     dispatch(fetchChannel(channel))
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader))
