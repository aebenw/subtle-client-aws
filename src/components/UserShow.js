import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import {FriendContainer} from '../containers/UserContainer'


import ChannelContainer from '../containers/ChannelContainer'
import ProfileHeader from '../components/ProfileHeader'




class UserShow extends Component {

    state = {
      view: "channels"
    }

      changeView = (change) => {
         return this.setState({
          view: change
        })
      }

      container = () => {
        const { view } = this.state
        const { userShow } = this.props

        if(view === "channels") {
          return (
            <ChannelContainer channels={userShow.channels} />
          )
        } else if(view === "myFriends"){
          return (
            <FriendContainer/>
          )
        } else if(view === "followedChannels"){
          return (
            <ChannelContainer channels={userShow.channel_follow}/>
          )
        }
      }
  render() {
    const {userShow} = this.props
    return (
      <Fragment>
      {userShow ?
        <Fragment>
          <ProfileHeader user={userShow} changeView={this.changeView}/>
          {this.container()}
        </Fragment>
      :
      <center><div className="spinner tertiary"></div></center>
    }
    </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userShow: state.users.userShow
  }
}


export default withRouter(connect(mapStateToProps)(UserShow))
